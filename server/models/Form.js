const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, requried: true },
  questions: [
    {
      question: { type: String, required: true },
      type: { type: String, required: true },
      options: { type: [String], required: false },
    },
  ],
});

module.exports = mongoose.model("Form", formSchema);
