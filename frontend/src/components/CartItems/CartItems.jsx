import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_item from "../../assets/cart_cross_icon.png";
const CartItems = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getCartTotalAmount,
  } = useContext(ShopContext);
  return (
    <div className="cart-items">
      <div className="cart-items-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product, index) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={index}>
              <div className="cart-items-format cart-items-main">
                <img src={product.image} alt="" className="cart-product-icon" />
                <p>{product.name}</p>
                <p>${product.new_price}</p>
                <button className="cart-items-quantity">
                  {cartItems[product.id]}
                </button>
                <p>${cartItems[product.id] * product.new_price}</p>
                <img
                  className="cart-item-remove"
                  src={remove_item}
                  alt=""
                  onClick={() => {
                    removeFromCart(product.id);
                  }}
                />
              </div>{" "}
              <hr />
            </div>
          );
        }

        return null;
      })}
      <div className="cart-items-down">
        <div className="total">
          <h1>Cart Totals</h1>
          <div>
            <div className="total-item">
              <p>Subtotal</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="total-item">
              <p>Total</p>
              <p>${getCartTotalAmount()}</p>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="promo-code">
          <p>If you have a Promo Code, Entre it here </p>
          <div className="promo-box">
            <input type="text" name="" id="" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
