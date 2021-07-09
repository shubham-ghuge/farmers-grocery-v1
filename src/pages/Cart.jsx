import React from "react";
import { useDataProvider } from "../contexts/useDataProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Jumbotron } from "../components";

export const Cart = () => {
  const [coupen, setCoupen] = useState(false);
  const { products, cart, dispatch } = useDataProvider();
  let navigation = useNavigate();
  const productsInCart = products.filter((item) => {
    return cart.find((i) => item._id === i._id);
  });

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

  return (
    <>
      <div className="cart-layout nav-adjust">
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
                  quantity
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
                          ₹{(price - (price * discount) / 100).toFixed(2)}
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
                        onClick={() => {
                          dispatch({
                            type: "DECREMENT",
                            payload: {
                              pid: _id,
                              pqty: quantity - 1
                            }
                          });
                        }}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="btn-outline-primary"
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT",
                            payload: { pid: _id, pqty: quantity + 1 }
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                    <h3 className="final-price">₹25.00</h3>
                  </div>
                )
              )}
            </div>

            <div className="checkout">
              <h3 className="muted">
                You are saving <span>₹ {totalSaved()}</span>
              </h3>
              <button
                className="coupen"
                onClick={() => setCoupen((prev) => (prev = !prev))}
              >
                {coupen ? "applied!" : "Apply coupen!"}
              </button>
              <div className="wrapper">
                <p className="muted">Delivery Charges</p>
                <p className="muted">₹ 50.00</p>
              </div>
              <div className="wrapper">
                <p className="muted">Total Payable</p>
                <h2>₹ {coupen ? cartTotal() - 5 : cartTotal()}</h2>
              </div>
              <button className="btn-success">Checkout</button>
            </div>
          </>
        ) : (
          <Jumbotron text="Cart" />
        )}
      </div>
    </>
  );
};
