"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Success = () => {
  return (
    <div className="col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-12 pl-24 md:pl-8 lg:overflow-hidden">
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200 ">
        <li className="flex flex-col gap-2">
          <p className="text-md font-semibold">Success</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs " action="">
            <ul className="">
              <li className="w-72 mt-2 md:w-64">
                <p>
                  Welcome Onboard! To continue, click the button below to
                  proceed to your account settings.
                </p>
              </li>
              <li className="flex mt-7 justify-center">
                <button className="bg-green-700 hover:bg-green-800 transition-all  text-white  py-3 px-6 rounded">
                  Finish Registration
                </button>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const OTPVerification = ({ otp, setOtp, validEmail, email, setUserInfo }) => {
  console.log("otp: ", otp);
  const [changeEmail, setChangeEmail] = useState(false);
  const inputRef = useRef(null);

  const handleChangeEmail = (e) => {
    setUserInfo({ ...setUserInfo, email: e.target.value });
  };

  const mainDiv = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      mainDiv.current.classList.remove("opacity-0");
    }, 500);
  });

  // FINAL FUNCTIONS
  const resendCode = (e) => {
    e.preventDefault();
  };

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={mainDiv}
      className="opacity-0 transition-all duration-300 col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-12 pl-24 md:pl-8 lg:overflow-hidden"
    >
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200">
        <li className="flex flex-col gap-2">
          <p className="text-md font-semibold">Verification</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-950"></span>
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs" action="">
            <ul className="">
              <li className="text-xs">
                <p>Code sent to</p>
              </li>
              <li className="flex flex-col gap-1">
                <input
                  disabled
                  ref={inputRef}
                  placeholder={email}
                  className="h-10 w-60 rounded-md  bg-gray-900 px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-900"
                  type="text"
                  onChange={handleChangeEmail}
                  value={changeEmail ? email : ""}
                />
                <span
                  className={`opacity-0 transition-all duration-300 absolute top-[10.5rem]  text-xs text-red-600`}
                >
                  Invalid Email Address
                </span>

                <span
                  onClick={() => setOtp("")}
                  className="text-right text-xs 
                 underline text-rose-800 font-semibold -translate-x-1 cursor-pointer hover:text-red-900 transition-all duration-300"
                >
                  Change Email
                </span>

                <div className="flex flex-row items-center justify-center gap-3">
                  <input
                    placeholder="Code"
                    className="mt-4 h-10 w-32 rounded-md border-slate-700 bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-900"
                    type="number"
                    name=""
                    id=""
                  />
                  <button
                    onClick={resendCode}
                    className={`mt-4 h-10 w-24 rounded-md bg-blue-800 text-xs transition-all duration-500 hover:bg-blue-950
                  `}
                  >
                    Resend
                  </button>
                </div>

                <button
                  onClick={registerUser}
                  className={`mx-auto mt-10 w-32 px-3 py-2 rounded-md bg-gradient-to-l from-indigo-600 to-violet-700  ${[
                    "hover:bg-indigo-800, hover:from-indigo-700, hover:to-violet-800",
                  ].join(" ")}`}
                >
                  Register
                </button>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const Register = ({
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  spanRef,
  proceedToOTP,
  userInfo,
  setUserInfo,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  return (
    <div className="col-span-5 overflow-scroll rounded-3xl border-fuchsia-400 py-8 pl-24 md:pl-8 lg:overflow-hidden">
      <ul className="mx-auto -ml-10 flex flex-col items-center gap-4 border-fuchsia-900 text-lg text-slate-200">
        <li className="flex flex-col gap-2">
          <p className="text-md font-semibold">Register</p>
          <div className="flex flex-row gap-3">
            <span className="h-2 w-14 rounded-3xl bg-indigo-700"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
            <span className="h-2 w-14 rounded-3xl bg-slate-800"></span>
          </div>
        </li>
        <li>
          <form className="grid border-teal-700 text-xs " action="">
            <ul className="">
              <li className="relative flex flex-col gap-6">
                <input
                  placeholder="First Name"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-900"
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={handleChange}
                  ref={firstNameRef}
                />
                <input
                  placeholder="Last Name"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-900"
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  ref={lastNameRef}
                />
                {/* border-2 border-rose-700  */}
                <input
                  placeholder="Email"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2  placeholder:opacity-50 focus:outline-indigo-900"
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  ref={emailRef}
                />
                <input
                  placeholder="Password"
                  className="transition-all duration-300 h-10 w-56 rounded-md  bg-slate-900 px-3 py-1 outline-none outline-2 placeholder:opacity-50 focus:outline-indigo-900"
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  ref={passwordRef}
                />
                <p
                  ref={spanRef}
                  className="opacity-0  transition-all duration-300 absolute  text-xs text-red-600"
                >
                  Error Message
                </p>

                <button
                  onClick={proceedToOTP}
                  className="relative mx-auto mt-1 w-32 rounded-md bg-gradient-to-l from-indigo-600 to-violet-700 px-3 py-2 hover:bg-indigo-800 hover:from-indigo-700 hover:to-violet-800"
                >
                  Next
                  <span className="loader absolute right-4 opacity-0"></span>
                </button>
              </li>
              <li className="md:mt-4 ml-4">
                <p>
                  Already have an account?{" "}
                  <Link href={"/login"}>
                    <span className="cursor-pointer font-semibold text-indigo-500 transition-all hover:text-indigo-700 hover:underline">
                      Login
                    </span>
                  </Link>
                </p>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

const Page = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [lastErrorInput, setLastErrorInput] = useState(null);
  const [lastSpanPosition, setLastSpanPosition] = useState("");

  const spanRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const proceedToOTP = async (e) => {
    e.preventDefault();

    if (lastErrorInput !== null && lastSpanPosition !== "") {
      // Remove error message
      lastErrorInput.current.classList.remove("border-2");
      lastErrorInput.current.classList.remove("border-rose-700");
      lastErrorInput.current.classList.add("focus:outline-indigo-900");
      spanRef.current.classList.add("opacity-0");
      spanRef.current.classList.remove(lastSpanPosition);
      console.log("lastErrorInput", lastErrorInput);
    }

    // Validate user input
    const { firstName, lastName, email, password } = userInfo;
    if (firstName === "") {
      setLastErrorInput(firstNameRef);
      setLastSpanPosition("top-[2.7rem]");
      //   spanRef.current.classList.add("opacity-100");
      spanRef.current.textContent = "First Name is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[2.7rem]");

      firstNameRef.current.focus();
      firstNameRef.current.classList.add("border-2");
      firstNameRef.current.classList.add("border-rose-700");
      firstNameRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (lastName === "") {
      setLastErrorInput(lastNameRef);
      setLastSpanPosition("top-[6.7rem]");
      spanRef.current.textContent = "Last Name is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[6.7rem]");
      lastNameRef.current.focus();
      lastNameRef.current.classList.add("border-2");
      lastNameRef.current.classList.add("border-rose-700");
      lastNameRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (email === "" || !validEmail(email)) {
      setLastErrorInput(emailRef);
      setLastSpanPosition("top-[10.7rem]");
      spanRef.current.textContent = "Invalid Email Address";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[10.7rem]");
      emailRef.current.focus();
      emailRef.current.classList.add("border-2");
      emailRef.current.classList.add("border-rose-700");
      emailRef.current.classList.remove("focus:outline-indigo-900");
      return;
    } else if (password === "") {
      setLastErrorInput(passwordRef);
      setLastSpanPosition("top-[14.7rem]");
      spanRef.current.textContent = "Password is required";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[14.7rem]");
      passwordRef.current.focus();
      passwordRef.current.classList.add("border-2");
      passwordRef.current.classList.add("border-rose-700");
      passwordRef.current.classList.remove("focus:outline-indigo-900");
      return;
    }

    // Send request to server and check if email is already registered
    const res = await fetch("http://localhost:5000/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email }),
    });
    if (res.status === 400) {
      setLastErrorInput(emailRef);
      setLastSpanPosition("top-[10.7rem]");
      spanRef.current.textContent = "Email already registered";
      spanRef.current.classList.remove("opacity-0");
      spanRef.current.classList.add("top-[10.7rem]");
      emailRef.current.focus();
      emailRef.current.classList.add("border-2");
      emailRef.current.classList.add("border-rose-700");
      emailRef.current.classList.remove("focus:outline-indigo-900");
      return;
    }
    if (res.status === 201) {
      const sentOtp = await res.json();
      setOtp(sentOtp.otp);
      console.log("otp: ", otp);
    }
  };

  return (
    <main className="register-route relative h-screen">
      <section className="relative z-10 mx-auto grid h-5/6 translate-y-11 grid-cols-8 rounded-3xl border-indigo-950 bg-black shadow-md shadow-violet-900 md:w-2/4">
        <div className="col-span-3 overflow-hidden rounded-lg">
          <Image
            height={500}
            width={500}
            className="h-full rounded-3xl bg-cover"
            src="https://i.imgur.com/9pSisLC.jpg"
            alt="e sync logo"
          />
        </div>
        {otp === "" && (
          <Register
            firstNameRef={firstNameRef}
            lastNameRef={lastNameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            spanRef={spanRef}
            proceedToOTP={proceedToOTP}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        )}
        {otp !== "" && (
          <OTPVerification
            otp={otp}
            setOtp={setOtp}
            validEmail={validEmail}
            email={userInfo.email}
            setUserInfo={setUserInfo}
          />
        )}
        {/* <Success /> */}
      </section>
    </main>
  );
};

export default Page;
