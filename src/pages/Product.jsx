import React from "react";
import { MdWhatshot } from "react-icons/md";
import {
  FiHome,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiShoppingCart,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../features/productSlice";

export const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const { products } = useSelector((state) => state.product);
  const { _id, name, description, price, imgUrl, discount, isInCart } =
    products.find((item) => item._id === productId);

  return (
    <>
      <button
        className="btn-c-primary nav-adjust"
        style={{ marginBottom: ".7rem", marginLeft: ".1rem" }}
        onClick={() => navigation("/store")}
      >
        Back to Products
      </button>
      <div className="product-layout">
        <img src={imgUrl} alt="test" />
        <span className="badge-rect-danger">{discount}% OFF</span>

        <div className="product">
          <div className="wrapper">
            <h3 className="product-heading">{name}</h3>
            <h4 className="product-description">{description}</h4>
            <h5 className="product-seller">by - farmerName</h5>
            <p className="product-discount">
              <span style={{ fontSize: "1.25rem", verticalAlign: "sub" }}>
                <MdWhatshot />
              </span>
              Flat Price Rs.{(price - (price * discount) / 100).toFixed(2)}
            </p>
            <div className="product-price">
              <p className="muted strike">MRP ₹{price.toFixed(2)}</p>
              <h2 className="price">
                ₹{(price - (price * discount) / 100).toFixed(2)}
                <span className="taxes d-sm-block d-none">
                  (inclusive all taxes)
                </span>
              </h2>
              <button
                className={
                  isInCart
                    ? "cta btn-success-active btn-addon"
                    : "cta btn-success btn-addon"
                }
                onClick={() =>
                  isInCart
                    ? navigation("/cart")
                    : dispatch(
                        addInCart({
                          productDetails: { productId: _id, quantity: 1 },
                        })
                      )
                }
              >
                <span className="icon">
                  <FiShoppingCart />
                </span>
                {isInCart ? "Go To Cart" : "Add To Cart"}
              </button>
              <span className="taxes d-sm-none d-block">
                (inclusive all taxes)
              </span>
            </div>
          </div>
          <div className="features">
            <h3>Four reason to shop with us?</h3>
            <div className="features-layout">
              <div className="feature">
                <span className="avatar-sm-i-primary">
                  <span
                    style={{
                      fontSize: "1.4rem",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <FiHome />
                  </span>
                </span>
                <p className="muted">Fresh Products</p>
                <p>Directly from farm to you</p>
              </div>
              <div className="feature">
                <span className="avatar-sm-i-primary">
                  <span
                    style={{
                      fontSize: "1.4rem",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <FiClock />
                  </span>
                </span>
                <p className="muted">On Time Guarantee</p>
                <p>Items delivered at the promised time</p>
              </div>
              <div className="feature">
                <span className="avatar-sm-i-primary">
                  <span
                    style={{
                      fontSize: "1.4rem",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <FiTruck />
                  </span>
                </span>
                <p className="muted">Free Delivery</p>
                <p>Eligible an above ₹750</p>
              </div>
              <div className="feature">
                <span className="avatar-sm-i-primary">
                  <span
                    style={{
                      fontSize: "1.4rem",
                      display: "block",
                      textAlign: "center",
                    }}
                  >
                    <FiCheckCircle />
                  </span>
                </span>
                <p className="muted">Best Quality</p>
                <p>10,000+ grocery & household products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
