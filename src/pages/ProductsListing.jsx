import React from "react";
import { Alert, GroceryCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../features/productSlice";

export const ProductsListing = () => {
  const { products, message } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  return (
    <div
      className={"d-flex nav-adjust"}
      style={{ flexWrap: "wrap", justifyContent: "center" }}
    >
      {message && (
        <Alert message={message} onClose={() => dispatch(setMessage(null))} />
      )}
      {products &&
        products.map((item) => <GroceryCard product={item} key={item._id} />)}
    </div>
  );
};
