import React from "react";
import { MdWhatshot } from "react-icons/md";
import {
  FiHome,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiShoppingCart,
} from "react-icons/fi";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addInCart } from "../features/productSlice";
import { Feature } from "../components";

export const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  let navigation = useNavigate();
  const { userLoginStatus } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const {
    _id,
    name,
    description,
    price,
    imgUrl,
    discount,
    isInCart,
    farmerId,
  } = (products.length !== 0 &&
    products.find((item) => item._id === productId)) || { price: 0 };
  if (products.length !== 0 && !name) {
    return <Navigate replace to="/notfound" />;
  }
  return (
    <div className="extra-margin">
      {products.length === 0 ? (
        "loading..."
      ) : (
        <div>
          <button
            className="btn-c-primary mb-4"
            onClick={() => navigation("/store")}
          >
            Back to Products
          </button>
          <div className="product-layout">
            <img src={imgUrl} className="bdrs-3" alt="test" />
            <span className="badge-rect-danger">{discount}% OFF</span>

            <div className="product">
              <div className="wrapper">
                <h3 className="product-heading">{name}</h3>
                <h4 className="product-description">{description}</h4>
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
                        : userLoginStatus &&
                          dispatch(
                            addInCart({ productId: _id, quantity: 1, farmerId })
                          )
                    }
                  >
                    <span className="icon">
                      <FiShoppingCart />
                    </span>
                    {userLoginStatus && isInCart ? "Go To Cart" : "Add To Cart"}
                  </button>
                  <span className="taxes d-sm-none d-block">
                    (inclusive all taxes)
                  </span>
                </div>
              </div>
              <div className="features">
                <h3>Four reason to shop with us?</h3>
                <div className="features-layout">
                  <Feature
                    details={{
                      heading: "Fresh Products",
                      text: "Directly from farm to you",
                    }}
                    icon={<FiHome />}
                  />
                  <Feature
                    details={{
                      heading: "On Time Guarantee",
                      text: "Items delivered at the promised time",
                    }}
                    icon={<FiClock />}
                  />
                  <Feature
                    details={{
                      heading: "Free Delivery",
                      text: "Eligible an above ₹7500",
                    }}
                    icon={<FiTruck />}
                  />
                  <Feature
                    details={{
                      heading: "Best Quality",
                      text: "10,000+ grocery & household products",
                    }}
                    icon={<FiCheckCircle />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
