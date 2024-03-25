import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product from "../../assets/Product_Cart.svg";
import list_products from "../../assets/Product_list_icon.svg";
import orders from "../../assets/order.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/add-product"}>
        <div className="sidebar-item">
          <img src={add_product} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/list-products"}>
        <div className="sidebar-item">
          <img src={list_products} alt="" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to={"/list-products"}>
        <div className="sidebar-item">
          <img src={orders} alt="" className="icon" />
          <p>Orders List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
