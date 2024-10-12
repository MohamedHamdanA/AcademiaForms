const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
// const sendOtpRoutes = require("./routes/sendOtp");
const studentRoutes = require("./routes/student");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
mongoose.connect(
  process.env.MONGODB_URI
);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/student", studentRoutes);
// app.use("/api/otp", sendOtpRoutes);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection established successfully");
});
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
