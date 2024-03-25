import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subcsribe to our newsletter and stay updated</p>
      <div>
        <input type="email" name="email" id="Your Email Address" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
