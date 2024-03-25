import React from "react";
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../../components/ListProduct/ListProduct";
import AddProduct from "../../components/AddProduct/AddProduct";
import EditProduct from "../../components/EditProduct/EditProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/list-products" element={<ListProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
