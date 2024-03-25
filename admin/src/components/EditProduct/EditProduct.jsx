import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import upload_area from "../../assets/upload_area.svg";

const EditProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    new_price: "",
    old_price: "",
  });

  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/product/" + id)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  }, []);

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const updateProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/product", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Product created") : alert("Failed");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          onChange={handleChange}
          value={productDetails.name}
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            onChange={handleChange}
            value={productDetails.old_price}
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            onChange={handleChange}
            value={productDetails.new_price}
          />
        </div>
      </div>

      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-select"
          onChange={handleChange}
          value={productDetails.category}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="add-product-itemfield">
        <label htmlFor="upload">
          <img
            src={productDetails.image ? productDetails.image : upload_area}
            className="addproduct-img"
            alt=""
          />
        </label>
        <input
          onChange={handleImage}
          type="file"
          id="upload"
          name="image"
          hidden
        />
      </div>
      <button onClick={updateProduct} className="addproduct-btn">
        Update Product
      </button>
    </div>
  );
};

export default EditProduct;
