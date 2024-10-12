const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  username: { type: String, required: true },
  answers: { type: [mongoose.Schema.Types.Mixed], required: true },
});

module.exports = mongoose.model("Submission", submissionSchema);
