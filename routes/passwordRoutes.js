const express = require("express");
const router = express.Router();
const { sendOtp } = require("../controllers/passwordController");

router.post("/send-otp", sendOtp);

module.exports = router;
