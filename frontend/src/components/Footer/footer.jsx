import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="logo" style={{ marginBottom: "1rem" }}>
          GIFTIFY<span className="gold-text">DELHI</span>
        </div>
        <p>&copy; 2026 Giftify Delhi. All rights reserved.</p>
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <a href="#" style={{ color: "#fff" }}>
            Instagram
          </a>
          <a href="#" style={{ color: "#fff" }}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
