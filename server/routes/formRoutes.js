const express = require("express");
const router = express.Router();
const Form = require("../models/Form");
const Submission = require("../models/Submission");

// Get all forms
router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    res.status(500).send("Error fetching forms");
  }
});

// Create new form (Teacher only)
router.post("/", async (req, res) => {
  const { title, questions, department } = req.body;

  // Validate input
  if (!title || !Array.isArray(questions) || questions.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid title or questions" });
  }

  try {
    const newForm = new Form({ title, questions, department });
    await newForm.save();
    res.status(201).json({ success: true, form: newForm });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, message: "Error creating form" });
  }
});

// Get form by ID
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(400).send("Error fetching form");
  }
});

module.exports = router;
