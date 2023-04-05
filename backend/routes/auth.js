const router = require("express").Router();
const axios = require("axios");
const User = require("../model/User");
require("dotenv").config();
const Otp = require("../model/Otp");
const verifyOtp = require("../controllers/verifyOtp");

router.post("/sendOTP", async (req, res) => {
  const { phone } = req.body;
  console.log(phone);
  const otp = Math.floor(1000 + Math.random() * 9000);
  const message = `Your OTP is ${otp}`;
  const url = `https://sms.aakashsms.com/sms/v3/send`;
  const body = {
    auth_token: process.env.SMS,
    to: phone,
    text: message,
  };
  try {
    // comment this line if you don't want to send sms

    // const response = await axios.post(url, body);
    // const data = await response.data;
    // console.log(data);
    const newOtp = new Otp({
      phone: phone,
      otp: otp,
      expireAt: Date.now() + 300000,
    });
    await newOtp.save();
    console.log(otp);
    res.status(200).json({ otp: otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { phone, name, city, age } = req.body;
  if (!phone || !name || !city || !age) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const newUser = new User({
    phone: phone,
    name: name,
    city: city,
    age: age,
  });
  try {
    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const isOtpValid = await verifyOtp(otp, phone);
  console.log(isOtpValid);
  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  const user = await User.findOne({ phone: phone });

  if (!user) {
    return res.json({ message: "CREATE" });
  }
  return res.json({ message: "SUCCESS" });
});

router.get("/data/:phone", async (req, res) => { 
  const { phone } = req.params;
  console.log(phone);
  const user = await User.findOne({ phone: phone });
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user: user });
});

module.exports = router;
