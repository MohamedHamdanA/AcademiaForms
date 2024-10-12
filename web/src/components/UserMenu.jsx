import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const menuRef = useRef(); // Ref for the menu container

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("department");
    navigate("/login"); // Redirect to home after logout
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If no username is found, show a "Login" button instead
  if (!username) {
    return (
      <Link to="/login" className="login-button">
        Login
      </Link>
    );
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      {/* Circle profile icon showing the first letter of the username */}
      <div className="profile-icon" onClick={() => setOpen(!open)}>
        {username?.charAt(0).toUpperCase()} {/* First letter of username */}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="dropdown-menu">
          <p className="dropdown-username">Hello, {username}!</p>
          <button onClick={handleLogout} className="dropdown-logout">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
