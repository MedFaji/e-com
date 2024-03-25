import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ image, name, old_price, new_price, id }) => {
  return (
    <div className="item">
      <Link onClick={window.scrollTo(0, 0)} to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <p>{name}</p>
      <div className="item-prices">
        <div className="new-price">${new_price}</div>
        <div className="old-price">${old_price}</div>
      </div>
    </div>
  );
};

export default Item;
