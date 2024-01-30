const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body;

      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ errorMessage: "Incorrect field" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ errorMessage: "Password must have more than 6 characters" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errorMessage: "Email already in use" });
      }

      // hash the password
      // generate salt
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      // save user to database
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });
      const savedUser = await newUser.save();
      console.log("savedUser: ", savedUser);

      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      );

      // send token in HTTP-only cookie
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
      // internal server error
    }

//   res.status(200).json({ message: "User Successfully Registered" });
});

// log in user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ errorMessage: "Incorrect field" });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
    // sends true if token is valid
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
