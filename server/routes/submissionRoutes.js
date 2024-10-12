const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// Submit a form response
router.post("/", async (req, res) => {
  const { formId, answers, username } = req.body; // Assume user is authenticated
  try {
    const newSubmission = new Submission({ formId, username, answers });
    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(400).send("Error submitting form");
  }
});
// router.get("/:formId", async (req, res) => {

//     const submissions = await Submission.find({ formId });
//     if (!submissions) {
//       return res.status(404).send("No submissions found for this form");
//     }

//     res.json(submissions);
//   } catch (error) {
//     console.error("Error fetching submissions:", error);
//     res.status(500).send(`Error fetching submissions: ${error.message}`);
//   }
// });

// Get submissions for a form
router.get("/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    console.log(`Fetching submissions for formId: ${formId}`);

    const submissions = await Submission.find({ formId });
    if (!submissions) {
      return res.status(404).send("No submissions found for this form");
    }
    console.log(submissions);
    return res.json(submissions); // Send response and exit
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return res.status(500).send(`Error fetching submissions: ${error.message}`); // Return to prevent additional responses
  }
});

router.put("/:submissionId", async (req, res) => {
  try {
    const { submissionId } = req.params;
    const updatedSubmission = await Submission.findByIdAndUpdate(
      submissionId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({ error: "Submission not found." });
    }
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ error: "Error updating submission." });
  }
});

module.exports = router;
