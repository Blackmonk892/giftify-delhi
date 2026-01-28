import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1>
          Moments Designed
          <br />
          To Be <span className="gold-text">Unforgettable.</span>
        </h1>
        <p>
          From viral car-boot surprises in Delhi NCR to custom streetwear and
          resin keepsakes. We craft the vibes you can't buy in stores.
        </p>
        <div className="hero-btn-group">
          {/* Changed <a> to <Link> and href to to="/shop" */}
          <Link to="/shop" className="btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
