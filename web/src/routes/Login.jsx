import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );
      const { token, role, username, department } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      localStorage.setItem("department", department);
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2 className="login-header">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleLogin}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <Field
                name="username"
                type="text"
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                name="password"
                type="password"
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </Form>
        </Formik>
      </div>
      <div className="register-container">
        <p>Don't have an account?</p>
        <button
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
