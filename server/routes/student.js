const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming this is the path to your User schema file

// @route   GET /api/students/department/:department
// @desc    Get all students from a specific department
// @access  Public or Private (depending on your authentication)
router.get("/department/:department", async (req, res) => {
  const { department } = req.params;
  try {
    // Find users with the role of "student" and the specified department
    const students = await User.find({ role: "student", department });
    console.log(students);
    // If no students are found, send a 404 response
    if (!students || students.length === 0) {
      return res
        .status(404)
        .json({ message: `No students found in ${department} department.` });
    }

    // Send the list of students as the response
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by department:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
