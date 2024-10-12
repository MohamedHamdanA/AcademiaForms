import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ViewSubmissions.css";

const ViewSubmissions = () => {
  const { formId } = useParams(); // Corrected typo in formId extraction
  const [submissions, setSubmissions] = useState([]);
  const [departmentStudents, setDepartmentStudents] = useState([]); // List of students from the department
  const [teacherDepartment, setTeacherDepartment] = useState(""); // Department of the teacher
  const [unfilledStudents, setUnfilledStudents] = useState([]); // Students who haven't filled the form
  const [form, setForm] = useState(null); // New state for form data
  const department = localStorage.getItem("department");
  const username = localStorage.getItem("username");
  const Navigate = useNavigate();

  // Fetch submissions for the given form ID
  useEffect(() => {
    if (!username) {
      Navigate("/login");
      return;
    }
    const fetchSubmissions = async () => {
      try {
        if (!formId) return; // Check if formId is valid
        const response = await axios.get(
          `http://localhost:5000/api/submissions/${formId}`
        );
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [formId, username, Navigate]);

  // Fetch form details
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${formId}`
        );
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchForm();
  }, [formId]);

  useEffect(() => {
    const fetchDepartmentStudents = async () => {
      try {
        if (!department) return;
        setTeacherDepartment(department);

        const response = await axios.get(
          `http://localhost:5000/api/student/department/${department}`
        );
        setDepartmentStudents(response.data);

        // Determine which students haven't filled out the form yet
        const submittedUsernames = submissions.map((sub) => sub.username);
        const unfilled = response.data.filter(
          (student) => !submittedUsernames.includes(student.username)
        );
        setUnfilledStudents(unfilled);
      } catch (error) {
        console.error("Error fetching department students:", error);
      }
    };
    fetchDepartmentStudents();
  }, [submissions, department]);

  return (
    <div className="view-submissions-container">
      <h2>Form Submissions</h2>

      {/* Section 1: All Submissions */}
      <div className="submissions-section">
        <h3>All Submissions</h3>
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          <ul>
            {submissions.map((submission, index) => (
              <li key={index} className="submission-item">
                <p>Submitted by: {submission.username}</p>
                {submission.answers.map((answer, i) => (
                  <p key={i} className="answer-item">
                    <strong>Question: {form?.questions[i]?.question}</strong>
                    <br />
                    Answer: {answer}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section 2: Department-Specific Submissions */}
      <div className="department-submissions-section">
        <h3>{teacherDepartment} Department Submissions</h3>
        <div className="filled-unfilled-section">
          {/* Students who have filled the form */}
          <div className="filled-submissions">
            <h4>Filled by Students</h4>
            {submissions.length === 0 ? (
              <p>No students from your department have filled the form yet.</p>
            ) : (
              <ul>
                {submissions.map((submission, index) => (
                  <li key={index} className="submission-item">
                    <p>{submission.username}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Students who haven't filled the form */}
          <div className="unfilled-submissions">
            <h4>Not Yet Filled</h4>
            {unfilledStudents.length === 0 ? (
              <p>All students have filled the form.</p>
            ) : (
              <ul>
                {unfilledStudents.map((student, index) => (
                  <li key={index} className="unfilled-student-item">
                    <p>{student.username}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissions;
