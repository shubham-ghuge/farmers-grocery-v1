import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Checkout, Jumbotron } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartData,
  removeFromCart,
  setMessage,
  updateInCart,
} from "../features/productSlice";

export const Cart = () => {
  const [coupen, setCoupen] = useState(false);
  const [showCheckout, setCheckout] = useState(false);
  let navigation = useNavigate();
  const dispatch = useDispatch();
  const { products, cart, cartMessage } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);
  const productsInCart = products.filter((item) =>
    cart.find((i) => item._id === i.productId)
  );

  function updateQuantityHandler(quantity, id, farmerId) {
    if (quantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateInCart({ productId: id, quantity, farmerId }));
    }
  }

  const cartTotal = () => {
    return productsInCart
      .reduce(
        (sum, { price, quantity, discount }) =>
          (sum =
            sum + (price - (price * discount) / 100).toFixed(2) * quantity),
        0
      )
      .toFixed(2);
  };
  const totalSaved = () => {
    return productsInCart
      .reduce(
        (sum, { price, quantity, discount }) =>
          (sum = sum + ((price * discount) / 100) * quantity),
        0
      )
      .toFixed(2);
  };
  function actualPrice(price, discount) {
    return (price - (price * discount) / 100).toFixed(2);
  }
  return (
    <>
      <div className="cart-layout extra-margin">
        {productsInCart.length ? (
          <>
            <div className="cart">
              <div className="cart-heading">
                <h3>product</h3>
                <h3>quantity</h3>
                <h3>price</h3>
              </div>
              {productsInCart.map(
                ({
                  _id,
                  name,
                  imgUrl,
                  description,
                  price,
                  discount,
                  quantity,
                  farmerId,
                }) => (
                  <div className="product-card" key={_id}>
                    <div
                      className="product-details cursor-pointer"
                      onClick={() => navigation(`/product/${_id}`)}
                    >
                      <img className="product-img" src={imgUrl} alt="product" />
                      <div className="wrapper">
                        <h3 className="product-title">
                          {name}
                          <span> 1kg</span>
                        </h3>
                        <h4 className="product-price">
                          ₹{actualPrice(price, discount)}
                          <span className="strike">₹ {price}.00</span>
                        </h4>
                        <h4 className="product-discount">
                          Discount: {discount}%
                        </h4>
                        <p className="product-description">{description}</p>
                        <p className="d-block d-sm-none"></p>
                      </div>
                    </div>
                    <div className="quantity">
                      <button
                        className="btn-outline-danger"
                        onClick={() =>
                          updateQuantityHandler(quantity - 1, _id, farmerId)
                        }
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="btn-outline-primary"
                        onClick={() =>
                          updateQuantityHandler(quantity + 1, _id, farmerId)
                        }
                      >
                        +
                      </button>
                    </div>
                    <h3 className="final-price">
                      ₹{(quantity * actualPrice(price, discount)).toFixed(2)}
                    </h3>
                  </div>
                )
              )}
            </div>
            <div className="checkout">
              {showCheckout ? (
                <Checkout cartPrice={coupen ? cartTotal() - 5 : cartTotal()} />
              ) : (
                <>
                  <h3 className="muted">
                    You are saving <span>₹ {totalSaved()}</span>
                  </h3>
                  <button
                    className="coupen"
                    onClick={() => setCoupen((prev) => (prev = !prev))}
                  >
                    {coupen ? "You saved 2%" : "Click here to save 2%!"}
                  </button>
                  <div className="wrapper">
                    <p className="muted">Delivery Charges</p>
                    <p className="muted">₹ 50.00</p>
                  </div>
                  <div className="wrapper">
                    <p className="muted">Total Payable</p>
                    <h2>
                      ₹{" "}
                      {coupen
                        ? (cartTotal() - (cartTotal() * 2) / 100).toFixed(2)
                        : cartTotal()}
                    </h2>
                  </div>
                  <button
                    className="btn-success"
                    onClick={() => setCheckout(true)}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <Jumbotron text="Cart" />
        )}
      </div>
      {cartMessage && (
        <Alert
          message={cartMessage}
          onClose={() => dispatch(setMessage("cartMessage"))}
          color={"primary"}
        />
      )}
    </>
  );
};
