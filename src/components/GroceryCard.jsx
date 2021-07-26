import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addInBag,
  addInCart,
  removeFromBag,
  setMessage,
} from "../features/productSlice";
import { Alert } from "./Alert";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

export function GroceryCard({ product }) {
  const { userLoginStatus } = useSelector((state) => state.auth);
  const [cartLoading, setCartLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { cartMessage } = useSelector((state) => state.product);
  let navigation = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = (productId, productStatus, farmerId) => {
    setCartLoading(true);
    if (!productStatus) {
      return dispatch(addInCart({ productId, quantity: 1, farmerId }));
    } else {
      return navigation("/cart");
    }
  };

  useEffect(() => {
    if (cartMessage) {
      setCartLoading(false);
    }
  }, [cartMessage]);

  return (
    <>
      <div className={"grocery-card"}>
        <Link to={`/product/${product._id}`}>
          <div className={"card-thumbnail"}>
            <img src={product.imgUrl} alt={"product"} />
          </div>
        </Link>
        <span
          className={product.isInBag ? "icon-active" : "icon"}
          onClick={() =>
            userLoginStatus && product.isInBag
              ? dispatch(removeFromBag(product._id))
              : dispatch(addInBag(product._id))
          }
        >
          <FiShoppingBag />
        </span>
        <div className={"card-details"}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigation(`/product/${product._id}`)}
          >
            <h3 className={"card-header"}>{product.name}</h3>
            <span className={"badge-rect-danger"}>{product.discount}% OFF</span>
            <p className={"card-price"}>
              &#x20b9;
              {Math.floor(
                product.price - (product.price * product.discount) / 100
              )}
              .00
              <span className={"strike"}>MRP ₹ {product.price}.00</span>
            </p>
          </div>
        </div>
        <button
          className={product.isInCart ? "card-cta-active" : "card-cta"}
          onClick={() =>
            userLoginStatus
              ? addToCartHandler(
                  product._id,
                  product.isInCart,
                  product.farmerId
                )
              : setShowAlert(true)
          }
        >
          {cartLoading
            ? "adding..."
            : product.isInCart
            ? "Go to Cart"
            : "Add To Cart"}
        </button>
      </div>

      {cartMessage && (
        <Alert
          message={cartMessage}
          color="success"
          onClose={() => dispatch(setMessage("cartMessage"))}
        />
      )}

      {showAlert && (
        <Alert
          message={"Please login to add product in cart"}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
