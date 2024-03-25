import React, { useEffect, useState } from "react";
import "./Popular.css";
import data from "../../assets/data";
import Item from "../Item/Item";

const Popular = () => {
  const [popularWomen, setPopularWomen] = useState([]);

  useEffect(() => {
    const fetchPopularWomens = async () => {
      let responseData;
      await fetch("http://localhost:4000/popularwomen")
        .then((res) => res.json())
        .then((data) => {
          setPopularWomen(data);
        });
    };

    fetchPopularWomens();
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularWomen.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
