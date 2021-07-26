import React from "react";
import { Alert, GroceryCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../features/productSlice";

export const ProductsListing = () => {
  const { products, message } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  return (
    <div className="flex-layout jc-center extra-margin">
      {message && (
        <Alert
          message={message}
          onClose={() => dispatch(setMessage("message"))}
        />
      )}
      {products &&
        products.map((item) => <GroceryCard product={item} key={item._id} />)}
    </div>
  );
};
