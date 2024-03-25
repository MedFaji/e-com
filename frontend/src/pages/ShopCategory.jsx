import React, { useContext } from "react";
import "./css/ShopCategory.css";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/Item/Item";

const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="banner" src={banner} alt="" />
      <div className="shop-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shop-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shop-products">
        {all_product.map((product, i) => {
          if (product.category === category) {
            return (
              <Item
                key={i}
                id={product.id}
                image={product.image}
                name={product.name}
                new_price={product.new_price}
                old_price={product.old_price}
              />
            );
          }
        })}
      </div>
      <div className="loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
