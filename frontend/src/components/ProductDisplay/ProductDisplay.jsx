import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_dull from "../../assets/star_dull_icon.png";
import star from "../../assets/star_icon.png";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="left">
        <div className="img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="img">
          <img src={product.image} alt="" className="main-img" />
        </div>
      </div>
      <div className="right">
        <h1>{product.name}</h1>
        <div className="right-stars">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star_dull} alt="" />
          <p>(122)</p>
        </div>
        <div className="right-prices">
          <div className="old-price">${product.old_price}</div>
          <div className="new-price">${product.new_price}</div>
        </div>
        <div className="description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
        <div className="sizes">
          <h1>Select size</h1>
          <div className="size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <div className="category">
          <span>Category :</span> Women, T-Shirt, Crop Top <br />
          <span>Tags :</span> Modern, Latest
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
