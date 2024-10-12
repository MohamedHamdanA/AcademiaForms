import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FormSubmission.css"; // Import the new CSS file

const FormSubmission = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submissionId, setSubmissionId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [departmentStudents, setDepartmentStudents] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      console.error("User doesn't exist");
      navigate("/login");
      return;
    }

    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/forms/${formId}`
        );
        setForm(response.data);
        setAnswers(new Array(response.data.questions.length).fill(""));
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchForm();

    const fetchSubmissions = async () => {
      try {
        if (!formId) return;
        const response = await axios.get(
          `http://localhost:5000/api/submissions/${formId}`
        );
        setSubmissions(response.data);
        const userSubmission = response.data.find(
          (sub) => sub.username === username
        );
        if (userSubmission) {
          setAnswers(userSubmission.answers);
          setSubmissionId(userSubmission._id);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [formId, username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = { formId, answers, username };
      if (submissionId) {
        await axios.put(
          `http://localhost:5000/api/submissions/${submissionId}`,
          responses
        );
      } else {
        await axios.post(`http://localhost:5000/api/submissions`, responses);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return form ? (
    <div className="form-container">
      <h2 className="form-title">{form.title}</h2>
      <form onSubmit={handleSubmit}>
        {form.questions.map((question, index) => (
          <div key={index} className="question-container">
            <label className="question-label">{question.question}</label>
            {question.type === "short-answer" ||
            question.type === "paragraph" ? (
              <input
                type="text"
                className="question-input"
                value={answers[index] || ""}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
                required
              />
            ) : question.type === "multiple-choice" ? (
              question.options.map((option, optIndex) => (
                <div key={optIndex} className="option-container">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label className="option-label">{option}</label>
                </div>
              ))
            ) : question.type === "checkboxes" ? (
              question.options.map((option, optIndex) => (
                <div key={optIndex} className="option-container">
                  <input
                    type="checkbox"
                    name={`question-${index}-${optIndex}`}
                    value={option}
                    checked={answers[index]?.includes(option) || false}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      if (e.target.checked) {
                        newAnswers[index] = newAnswers[index]
                          ? [...newAnswers[index], option]
                          : [option];
                      } else {
                        newAnswers[index] = newAnswers[index].filter(
                          (ans) => ans !== option
                        );
                      }
                      setAnswers(newAnswers);
                    }}
                  />
                  <label className="option-label">{option}</label>
                </div>
              ))
            ) : question.type === "dropdown" ? (
              <select
                className="dropdown-select"
                value={answers[index] || ""}
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              >
                <option value="">Select an option</option>
                {question.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  ) : (
    <p className="loading-text">Loading form...</p>
  );
};

export default FormSubmission;
