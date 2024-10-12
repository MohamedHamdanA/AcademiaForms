import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [forms, setForms] = useState([]);
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("username");
  const department = localStorage.getItem("department");
  const Navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      Navigate("/login");
    }
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        const filtered = response.data.filter(
          (form) => form.department === department
        );
        setForms(filtered);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);
  return (
    <div className="home-container">
      <h1 className="home-header">
        Welcome {role === "teacher" ? "Teacher" : "Student"}
      </h1>
      {role === "teacher" && (
        <Link to="/create-form" className="create-form-link">
          Create New Form
        </Link>
      )}

      <h2 className="forms-header">Available Forms</h2>
      <ul className="forms-list">
        {forms.map((form) => (
          <li key={form._id} className="form-item">
            {role === "student" ? (
              <Link to={`/submit-form/${form._id}`} className="form-link">
                {form.title}
              </Link>
            ) : (
              <Link to={`/view-submissions/${form._id}`} className="form-link">
                {form.title} (View Submissions)
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
