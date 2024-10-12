import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // Optional: Import styles for better styling

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e, setFieldValue) => {
    const email = e.target.value;
    setFieldValue("username", email);

    // Determine role based on email format
    if (email.includes("@citchennai.net")) {
      const emailParts = email.split("@")[0].split(".");
      console.log(emailParts);

      // If there is at least one dot, it's a student; otherwise, it's a teacher
      if (emailParts.length > 1) {
        setRole("student");
        setFieldValue("department", emailParts[1].replace(/[0-9]/g, "")); // Set the department automatically
      } else {
        // No dot means it's likely a teacher
        setRole("teacher");
        setFieldValue("department", ""); // Clear department for teachers to select manually
      }
    } else {
      setRole(""); // Clear role if not a valid college email
      setFieldValue("department", "");
    }
  };

  const handleRegister = async (values) => {
    if (!values.username.includes("@citchennai.net")) {
      setErrorMessage("Please enter a valid college email ID.");
      return;
    }

    try {
      values.role = role;
      console.log(values);
      await axios.post("http://localhost:5000/api/auth/register", values);
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Formik
        initialValues={{ username: "", password: "", department: "" }}
        onSubmit={handleRegister}
      >
        {({ setFieldValue, values }) => (
          <Form className="register-form">
            <label>College Email ID:</label>
            <Field
              name="username"
              type="text"
              required
              placeholder="e.g., name.departmentBatch@citchennai.net"
              onChange={(e) => handleEmailChange(e, setFieldValue)}
            />
            <ErrorMessage
              name="username"
              component="div"
              className="error-message"
            />

            <label>Password:</label>
            <Field
              name="password"
              type="password"
              required
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="error-message"
            />

            {/* Conditional Department Input */}
            {role === "teacher" && (
              <>
                <label>Department:</label>
                <Field name="department" as="select" required>
                  <option value="">Select Department</option>
                  <option value="cse">CSE</option>
                  <option value="aiml">AIML</option>
                  <option value="ece">ECE</option>
                  <option value="eee">EEE</option>
                  <option value="mech">Mechanical</option>
                  <option value="civil">Civil</option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="error-message"
                />
              </>
            )}

            <button type="submit" className="register-button">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
