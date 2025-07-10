const User = require("../models/user");
const nodemailer = require("nodemailer");

exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save OTP to user document (optional but recommended)
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // expires in 10 minutes
        await user.save();

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // your email
                pass: process.env.EMAIL_PASS  // your email password or app password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP code is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};
