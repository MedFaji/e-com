import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import edit_icon from "../../assets/edit.png";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  const removeProduct = async (id) => {
    const confirmation = confirm("Are you sure ?");
    if (confirmation) {
      await fetch("http://localhost:4000/delete-product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    }
    location.reload();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Category</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Actions</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
              <div
                className="listproduct-format-main listproduct-format"
                key={index}
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-image"
                />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <div className="listproduct-icons">
                  <img
                    src={cross_icon}
                    alt=""
                    className="listproduct-remove-icon"
                    onClick={() => {
                      removeProduct(product.id);
                    }}
                  />
                  <Link to={"/edit-product/" + product.id}>
                    <img
                      src={edit_icon}
                      alt=""
                      className="listproduct-edit-icon"
                    />
                  </Link>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
