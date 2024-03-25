import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import new_collections from "../../assets/new_collections";
import Item from "../Item/Item";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      let responseData;
      await fetch("http://localhost:4000/newcollections")
        .then((res) => res.json())
        .then((data) => {
          setNewCollection(data);
        });
    };

    fetchNewCollections();
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((collection, i) => {
          return (
            <Item
              key={i}
              id={collection.id}
              image={collection.image}
              name={collection.name}
              new_price={collection.new_price}
              old_price={collection.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
