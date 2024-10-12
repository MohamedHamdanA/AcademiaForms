// Footer.js
import React from "react";
import "./Footer.css"; // Import the CSS for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> |
        <a href="/terms-of-service"> Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
