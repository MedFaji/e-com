import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data using id
    const productData = all_product.find((e) => e.id === Number(id));
    setProduct(productData);
  }, [all_product, id]);

  return (
    <div>
      {product ? (
        <>
          <Breadcrumb product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox />
          <RelatedProducts />
        </>
      ) : (
        <p>Loading...</p> // You can replace this with a loader component
      )}
    </div>
  );
};

export default Product;
