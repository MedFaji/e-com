import React, { useContext, useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import cart from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const NavBar = () => {
  const [current, setCurrent] = useState("shop");
  const { cartItems } = useContext(ShopContext);

  // Calculate the total count of items in the cart
  const cartItemCount = Object.values(cartItems).reduce(
    (acc, item) => acc + item,
    0
  );

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="medevs" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => setCurrent("shop")}>
          <Link to={"/"}>Shop</Link>
          {current === "shop" && <hr />}
        </li>
        <li onClick={() => setCurrent("men")}>
          <Link to={"/men"}>Men</Link> {current === "men" && <hr />}
        </li>
        <li onClick={() => setCurrent("women")}>
          <Link to={"/women"}>Women</Link> {current === "women" && <hr />}
        </li>
        <li onClick={() => setCurrent("kid")}>
          <Link to={"/kids"}>Kids</Link>
          {current === "kid" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        )}

        <Link to={"/cart"}>
          <img src={cart} alt="" />
        </Link>
        <div className="nav-cart-count">{cartItemCount}</div>
      </div>
    </div>
  );
};

export default NavBar;
