import React from "react";
import "./Footer.css";
import footer_logo from "../../assets/logo.png";
import insta from "../../assets/instagram_icon.png";
import pinterest from "../../assets/pintester_icon.png";
import whatsapp from "../../assets/whatsapp_icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Officies</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src={insta} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={pinterest} alt="" />
        </div>
        <div className="footer-icon-container">
          <img src={whatsapp} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>UrbanChic Boutique {currentYear} - All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
