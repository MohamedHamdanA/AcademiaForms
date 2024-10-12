const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], default: "student" },
  department: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  }, // Required for students
});

module.exports = mongoose.model("User", userSchema);
