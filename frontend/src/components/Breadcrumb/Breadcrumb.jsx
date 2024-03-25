import React, { useEffect } from "react";
import "./Breadcrumb.css";
import arrow from "../../assets/breadcrum_arrow.png";

const Breadcrumb = ({ product }) => {
  return (
    <div className="breadcrumb">
      HOME <img src={arrow} alt="" /> SHOP <img src={arrow} alt="" />
      {product.category}
      <img src={arrow} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrumb;
