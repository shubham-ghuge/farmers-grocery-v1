import React from "react";
import { GroceryCard } from "../components";
import { useSelector } from "react-redux";

export const ProductsListing = () => {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  return (
    <div
      className={"d-flex nav-adjust"}
      style={{ flexWrap: "wrap", justifyContent: "center" }}
    >
      {products &&
        products.map((item) => <GroceryCard product={item} key={item._id} />)}
    </div>
  );
};
