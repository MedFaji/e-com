import React from "react";
import "./Hero.css";
import hand_icon from "../../assets/hand_icon.png";
import arrow_icon from "../../assets/arrow.png";
import hero_image from "../../assets/logo.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Explore</h2>
        <div>
          <div className="hero-hand-icon">
            <p></p>
          </div>
          <p>UrbanChic Boutique</p>
          <p id="last">for Trendsetting Streetwear</p>
        </div>

        <div className="hero-latest-btn">
          <div>Step into Style</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
