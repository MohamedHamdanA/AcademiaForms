// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu"; // Import the new UserMenu component
import "./Navbar.css"; // Import the CSS for Navbar

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-name">
          Form-Management
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {localStorage.getItem("role") === "teacher" && (
          <li>
            <Link to="/create-form">Create Form</Link>
          </li>
        )}

        {token ? (
          <li>
            <UserMenu /> {/* Show the UserMenu component if logged in */}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
