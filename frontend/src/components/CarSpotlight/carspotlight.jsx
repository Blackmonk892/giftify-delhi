import React from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const About = () => {
  useScrollReveal();

  return (
    <section
      className="container reveal"
      style={{ textAlign: "center", padding: "4rem 0" }}
      id="about"
    >
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem" }}>
        Why Giftify?
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <div style={{ maxWidth: "300px" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
            Custom Made
          </h3>
          <p style={{ color: "var(--text-muted)" }}>
            Every resin piece and hoodie is hand-crafted to your specs.
          </p>
        </div>
        <div style={{ maxWidth: "300px" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
            Doorstep Surprise
          </h3>
          <p style={{ color: "var(--text-muted)" }}>
            We come to your location for car decorations.
          </p>
        </div>
        <div style={{ maxWidth: "300px" }}>
          <h3 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>
            Delhi Aesthetics
          </h3>
          <p style={{ color: "var(--text-muted)" }}>
            Designs curated for the modern Indian aesthetic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
