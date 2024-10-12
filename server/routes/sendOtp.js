const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

let otps = {}; // Temporarily store OTPs for demonstration. Use Redis or similar in production.

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email ID
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Generate a random 6-digit OTP
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to the email provided
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@citchennai.net")) {
    return res
      .status(400)
      .json({ message: "Please enter a valid college email." });
  }

  // Generate OTP and store it with expiration
  const otp = generateOtp();
  otps[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 minutes

  // Send OTP email
  const mailOptions = {
    from: "b@citchennai.net",
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully to " + email });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otps[email];

  if (!storedOtp) {
    return res
      .status(400)
      .json({ message: "OTP not found. Please request a new one." });
  }

  // Check if OTP is correct and not expired
  if (storedOtp.otp === otp && Date.now() < storedOtp.expiresAt) {
    delete otps[email]; // Remove OTP after successful verification
    return res.status(200).json({ message: "OTP verified successfully" });
  }

  res.status(400).json({ message: "Invalid or expired OTP" });
});

module.exports = router;
