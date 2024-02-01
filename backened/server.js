// Set up an express app
const express = require("express");
const app = express();
const port = 4000;
const axios = require("axios");
const cors = require("cors");
const PDFDocument = require("pdf-lib").PDFDocument;
const { rgb, concatTransformationMatrix } = require("pdf-lib");
const StandardFonts = require("pdf-lib").StandardFonts;
const PDFFont = require("pdf-lib").PDFFont;
const bodyParser = require("body-parser");
const { copyStringIntoBuffer, pdfDocEncodingDecode } = require("pdf-lib");
const { AiOutlineFileAdd } = require("react-icons/ai");
const path = require("path");
const fs = require("fs");
const fontkit = require("@pdf-lib/fontkit");
const { Open_Sans } = require("next/font/google");
const bwipjs = require("bwip-js");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
require("dotenv").config();
// import { Resend } from "resend";
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
app.use(bodyParser.json());
app.use(cors({}));
resend.apiKeys.create({ name: "Production" });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("./generated/client"); // Adjust the path based on your project structure

const prisma = new PrismaClient();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

app.get("/test", async (req, res) => {
  try {
    // Insert a user with a store
    // const user = await prisma.user.create({
    //   data: {
    //     firstName: "Huzaifa",
    //     lastName: "Doe",
    //     email: "john.doe@example.com",
    //     password: "hashed_password", // Hash the password using a secure method
    //     phone: "1234567890",
    //     address: "123 Main St, City",
    //   },
    // });

    const store = await prisma.store.create({
      data: {
        userId: 2, // Specify the userId for the associated user
        name: "SHOPIFY STORE",
        imageURL: "https://example.com/store-image.jpg",
        storeInfo: { key: "value" },
      },
    });

    console.log("store Inserted:", store);
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await prisma.$disconnect();
  }
  res.status(200).json({ message: "User has been inserted" });
});

app.get("/", async (req, res) => {
  // res.send("Hello World!");
  // const users = await User.find({});
  const userEmail = req.headers["email"];
  console.log("usermeail: ", userEmail);

  // res.send(userEmail);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://nakson.myshopify.com/admin/api/2023-10/orders.json?status=open&limit=200",
    headers: {
      "X-Shopify-Access-Token": "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",
    },
  };

  let order_req = await axios.request(config);
  res.send(order_req.data);
});

// LOGIN AND REGISTER ENDPOINTS
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);

  // res.status(400).json({ message: "Invalid Credentials" });
  res.status(200).json({
    id: 1,
    email,
    name: "Hamad Ali",
    firstName: "Hamad",
    lastName: "Ali",
    store: "Shopify",
  });
});

app.post("/otp", async (req, res) => {
  // Check if the email is valid and already exists in the database
  const { email } = req.body;

  const user = await prisma.user.findFirst({
    where: { email: email },
  });

  if (user) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const otp = generateOTP();

  const { data, error } = await resend.emails.send({
    from: "ESync@mail.nakson.services",
    to: ["captain.gaze@gmail.com"],
    subject: "One-Time Password (OTP) Verification",
    html: `
    <p style="font-weight: bold;">Please use the following OTP to complete the verification process:</p>
    <p style="background-color: #f5f5f5; padding: 10px; font-size: 16px; font-weight: bold;">OTP Code: ${otp}</p>
    `,
  });

  res.status(200).json(otp);
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("req.body", req.body);

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  // data:  {
  //   firstName: 'asd',
  //   lastName: 'asd',
  //   email: 'john.doe123@example.com',
  //   password: '23'
  // }
  try {
    // Insert a user with a store
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash, // Hash the password using a secure method
        phone: "null",
        address: "null",
      },
    });
    console.log("User Inserted:", user);
  } catch (error) {
    console.error("Error inserting sample data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
  res.status(200).json({ message: "User has been registered successfully" });
});

// _____________________

app.get("/orders", async (req, res) => {
  res.send("hello");
  // let orders = [];

  // let config = {
  //   method: "get",
  //   maxBodyLength: Infinity,
  //   url: "https://{shop_name}.myshopify.com/admin/api/2023-10/orders.json?status=open&limit=200&financial_status=unpaid&fulfillment_status=unfulfilled",
  //   headers: {
  //     "X-Shopify-Access-Token": "{access_token}",
  //   },
  // };

  // let order_req = await axios.request(config);
  // order_req = order_req.data.orders.filter((order) =>
  //   order.tags.toLowerCase().includes("")
  // );
  // order_req.forEach((order) => {
  //   orders.push({
  //     ...order,
  //     shop_name: "{shop_name}",
  //   });
  // });

  // res.send(orders);
});
// _____________________

app.post("/orders", async (req, res) => {
  const { orders: orders } = req.body;
  let booked = [];

  console.log("orders received: ", orders.length, "\n");

  for (let order of orders) {
    booked.push({
      booked_packet_weight: 100,
      booked_packet_no_piece: 1,
      booked_packet_collect_amount: Number(order.total_outstanding),
      booked_packet_order_id: order.name,
      origin_city: 475, // Hyderabad
      destination_city: Number(order.correct_city.id),
      shipment_id: "875539",
      shipment_name_eng: "Nakson",
      shipment_email: "nakson.pk@gmail.com",
      shipment_phone: "03481273957",
      shipment_address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad",
      consignment_name_eng:
        order.shipping_address.first_name +
        " " +
        order.shipping_address.last_name,
      // "Abey yar"
      consignment_phone: String(order.shipping_address.phone)
        ? String(order.shipping_address.phone)
        : "No Phone",
      // "101010101",
      consignment_address:
        order.shipping_address.address1 + " " + order.shipping_address.address2,
      // "asdasdasdasdasdasdasdasdasdasdasdasdasd",
      special_instructions: "booked thorugh automated system of nakson",
      shipment_type: "",
    });
  }

  let data = JSON.stringify({
    api_key: process.env.LEOPARDS_API_KEY,
    api_password: process.env.LEOPARDS_API_PASSWORD,
    packets: booked,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://new.leopardscod.com/webservice/batchBookPacket/format/json",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let booked_orders_details = [];
  let response = "";
  try {
    response = await axios.request(config).then((response) => {
      return response.data;
    });

    let saved_data = [
      // Order ID, Track Number
    ];

    for (let i = 0; i < response.data.length; i++) {
      saved_data.push([orders[i].id, response.data[i].track_number]);
    }

    // const status = await fulfillShopifyOrders(saved_data);
    // console.log("status: ", status);

    console.log(saved_data, "\n");

    for (let i = 0; i < response.data.length; i++) {
      booked_orders_details.push({
        shop_name: orders[i].order_status_url.split("/")[2],
        service_type: orders[i].service_type.toUpperCase(),
        courier: "Leopards",
        consignee_info: {
          name: booked[i].consignment_name_eng,
          address: booked[i].consignment_address.replace(/[\r\n]/gm, ""),
          phone: booked[i].consignment_phone,
        },
        shipper_info: {
          name: "Nakson",
          address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
          phone: "03481273957",
        },
        destination: orders[i].correct_city,
        shipping_instructions: "Call the consignee before delivery",
        date: new Date().toLocaleString().split(",")[0],
        pieces: booked[i].booked_packet_no_piece,
        weight: booked[i].booked_packet_weight,
        amount: booked[i].booked_packet_collect_amount,
        track_number: response.data[i].track_number,
        booked_packet_order_name: response.data[i].booked_packet_order_id,
        collectType:
          booked[i].booked_packet_collect_amount === 0
            ? "Non-COD Parcel"
            : "COD Parcel",
      });
    }
  } catch (err) {
    console.log("Error: ", err);
  }

  let pdfBytes = await generateCusotmizedSlip(booked_orders_details);

  res.status(200).send({
    message: "Orders have been Booked",
    booked_orders: booked_orders_details,
    pdfBytes,
  });
});

app.post("/cancel", async (req, res) => {
  let pdfBytes = await generateCusotmizedSlip([1, 2, 3]);
  res.status(200).send({
    message: "Function has been called",
    pdfBytes,
  });
});

app.get("/api/hello", (req, res) => {
  res.status(200).send({
    message: "Hello from server.js",
  });
});

async function fetchPdfBytes(url) {
  const response = await fetch(url);
  const pdfBytes = await response.arrayBuffer();
  return pdfBytes;
}

async function generateCusotmizedSlip(slipData) {
  slipData = [
    {
      shop_name: "Momdaughts",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Palwasha Khalid",
        address: "House#626Astreet3G11/1islamabad nul",
        phone: "03425093244",
      },
      shipper_info: {
        name: "Momdaughts",
        address: "172-D Momdaughts Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: { id: 486, name: "Islamabad" },
      shipping_instructions: "Call the consignee before delivery",
      date: "1/14/2024",
      pieces: 1,
      weight: 100,
      amount: 1298,
      track_number: "HD753212721",
      booked_packet_order_name: "#MD3590",
      collectType: "COD Parcel",
    },
  ];

  let mergedPdfDoc = "";
  let mergedPdfBytes = "";
  mergedPdfDoc = await PDFDocument.create();

  // Fonts

  mergedPdfDoc.registerFontkit(fontkit);
  //load font and embed it to pdf documentx

  const fontBytes = fs.readFileSync(
    path.join(__dirname, "../fonts/Impact.ttf")
  );
  const Impact = await mergedPdfDoc.embedFont(fontBytes);

  const fontBytes2 = fs.readFileSync(
    path.join(__dirname, "../fonts/open-sans.bold.ttf")
  );
  const OpenSansBold = await mergedPdfDoc.embedFont(fontBytes2);

  const fontInUse = Open_Sans;
  const fontinBoldUse = OpenSansBold;

  // Calculate the height of each page
  // const height1 = mergedPdfDoc.getPage(0).getHeight();
  // const width1 = mergedPdfDoc.getPage(0).getWidth();
  // console.log("page height: ", height1);

  for (let order of slipData) {
    const addressWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.consignee_info.address, 9)
    );
    const addressMaxWidth = 170;
    const addressLineHeight = 10;
    const adressNumberOfLines = Math.ceil(addressWidth / addressMaxWidth);
    const addressHeight = adressNumberOfLines * addressLineHeight;
    // console.log("address width: ", addressWidth);
    // console.log("address height: ", addressHeight);
    const page = mergedPdfDoc.addPage([595, 305 + addressHeight - 35]);

    const { width, height } = page.getSize();

    // console.log("page width: ", width);
    // console.log("page height: ", height);

    // Fetch QR Code
    let qrCodeBytes = "";
    try {
      qrCodeBytes = await fetchPdfBytes(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${order.track_number},${order.destination.id},${order.amount}`
      );
      const qrCodeImage = await mergedPdfDoc.embedPng(qrCodeBytes);
      // add qr code
      page.drawImage(qrCodeImage, {
        x: 253,
        y: 80 + addressHeight,
        width: 90,
        height: 90,
      });

      const barcodeBuffer = await bwipjs.toBuffer({
        bcid: "code128", // Barcode type
        text: order.track_number,
        scale: 5, // 3x scaling factor
        height: 6, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: "center", // Always good to set this
      });

      const barcodeImg = await mergedPdfDoc.embedPng(barcodeBuffer);

      // add barcode
      page.drawImage(barcodeImg, {
        x: (width - 270) / 2,
        y: 176 + addressHeight,
        width: 270,
        height: 40,
      });

      // Logo Image
      const uint8Array = fs.readFileSync("../images/md.png");
      const logoImage = await mergedPdfDoc.embedPng(uint8Array);
      page.drawImage(logoImage, {
        x: 14,
        y: 210 + addressHeight,
        width: 100,
        height: 50,
      });

      const uint8Array1 = fs.readFileSync("../images/leopards.png");
      const leopardsImage = await mergedPdfDoc.embedPng(uint8Array1);
      page.drawImage(leopardsImage, {
        x: 470,
        y: 210 + addressHeight,
        width: 100,
        height: 30,
      });
    } catch (err) {
      console.log("Error fetching QRCODE: ", err);
    }

    // Order Service Type
    page.drawText(order.service_type, {
      font: fontinBoldUse,
      size: 28,
      x:
        (width -
          Math.ceil(fontinBoldUse.widthOfTextAtSize(order.service_type, 28))) /
        2,
      y: 241 + addressHeight,
    });
    // COD OR NON COD
    page.drawText(order.collectType, {
      font: fontInUse,
      size: 10,
      x:
        (width -
          Math.ceil(fontinBoldUse.widthOfTextAtSize(order.collectType, 10))) /
        2,
      y: 226 + addressHeight,
    });

    // page.drawRectangle({
    //   x: (width - 282) / 2,
    //   y: 173 + addressHeight,
    //   width: 282,
    //   height: 45,
    //   borderWidth: 1.5,
    //   opacity: 0,
    //   borderOpacity: 1,
    // });

    page.drawRectangle({
      x: 14,
      y: 7,
      width: 566,
      height: 166 + addressHeight,
      borderWidth: 2.5,
      opacity: 0,
      borderOpacity: 1,
    });

    page.drawSquare({
      x: (width - 100) / 2,
      y: 108 + addressHeight - 35,
      borderWidth: 1.5,
      size: 100,
      opacity: 0,
    });

    page.drawLine({
      start: { x: (width - 1.5) / 2, y: 108 + addressHeight - 35 },
      end: { x: (width - 1.5) / 2, y: 35 },
      thickness: 1,
    });

    page.drawLine({
      start: { x: 14, y: 35 },
      end: { x: 14 + 565, y: 35 },
      thickness: 1.5,
    });

    page.drawLine({
      start: { x: 399, y: 35 },
      end: { x: 399, y: 7 },
      thickness: 1,
    });

    // Shipper Information Line (below Contact#)
    page.drawLine({
      start: { x: 354, y: 75 + addressHeight },
      end: { x: 574, y: 75 + addressHeight },
      thickness: 1,
    });

    // Consignee Information
    page.drawText("Consignee Information", {
      font: fontinBoldUse,
      size: 16,
      x: 20,
      y: 191 + addressHeight - 35,
    });

    page.drawText("Name:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 170 + addressHeight - 35,
    });
    page.drawText(order.consignee_info.name, {
      font: fontInUse,
      x: 75,
      size: 9,
      y: 170 + addressHeight - 35,
    });

    page.drawText("Address:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 155 + addressHeight - 35,
    });
    page.drawText(order.consignee_info.address, {
      font: fontInUse,
      x: 75,
      size: 9,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });

    page.drawText("Contact:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 118,
    });

    page.drawText(order.consignee_info.phone, {
      font: fontInUse,
      x: 75,
      size: 9,
      y: 118,
    });

    // Line
    page.drawLine({
      start: { x: 20, y: 113 },
      end: { x: 238, y: 113 },
      thickness: 1,
    });

    // Remarks
    page.drawText("Remarks: ", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 100,
    });
    page.drawText(order.shipping_instructions, {
      font: fontInUse,
      x: 75,
      size: 9,
      maxWidth: addressMaxWidth, //170
      y: 100,
    });

    // Shipper Information
    page.drawText("Shipper Information", {
      font: fontinBoldUse,
      size: 16,
      x: 354,
      y: 191 + addressHeight - 35,
    });

    page.drawText("Name:", {
      font: fontInUse,
      size: 10,
      x: 354,
      y: 170 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.name, {
      font: fontInUse,
      x: 409,
      size: 9,
      y: 170 + addressHeight - 35,
    });

    page.drawText("Address:", {
      font: fontInUse,
      size: 10,
      x: 354,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.address.slice(0, 200), {
      font: fontInUse,
      x: 409,
      size: 9,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });

    page.drawText("Contact:", {
      font: fontInUse,
      size: 10,
      x: 354,
      y: 115 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.phone, {
      font: fontInUse,
      x: 409,
      size: 9,
      y: 115 + addressHeight - 35,
    });

    // Destination
    page.drawText("Destination:", {
      font: fontinBoldUse,
      size: 18,
      x: 20,
      y: 14,
    });

    page.drawText(order.destination.name, {
      font: fontinBoldUse,
      size: 16,
      x: 146,
      y: 14,
    });

    // RS
    let amountWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize("RS" + String(order.amount), 28)
    );

    page.drawText("RS " + String(order.amount), {
      font: Impact,
      size: 28,
      x: 396 + (181 - amountWidth),
      y: 9,
    });

    // Tracking #, Date, Pieces and Weight
    page.drawText("Tracking #:", {
      size: 10,
      x: 301,
      y: 97 + addressHeight - 35,
    });
    page.drawText(order.track_number, {
      size: 10,
      x: 354,
      y: 97 + addressHeight - 35,
    });

    page.drawText("Date:", {
      size: 10,
      x: 301,
      y: 85 + addressHeight - 35,
    });
    page.drawText(order.date, {
      size: 10,
      x: 354,
      y: 85 + addressHeight - 35,
    });

    page.drawText("Pieces:", {
      size: 10,
      x: 301,
      y: 73 + addressHeight - 35,
    });
    page.drawText(String(order.pieces), {
      size: 10,
      x: 354,
      y: 73 + addressHeight - 35,
    });

    page.drawText("Weight:", {
      size: 10,
      x: 301,
      y: 61 + addressHeight - 35,
    });
    page.drawText(String(order.weight), {
      size: 10,
      x: 354,
      y: 61 + addressHeight - 35,
    });

    // Order Name
    let orderNameWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.booked_packet_order_name, 18)
    );
    page.drawText(order.booked_packet_order_name, {
      size: 18,
      x: 15 + 566 - orderNameWidth,
      y: 40,
    });
  }

  mergedPdfBytes = await mergedPdfDoc.save();
  return mergedPdfBytes;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
