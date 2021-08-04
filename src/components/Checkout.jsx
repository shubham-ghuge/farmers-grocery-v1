import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder, setMessage } from "../features/orderSlice";
import { fetchProducts, resetCart } from "../features/productSlice";
import { Alert } from "./Alert";
import { apiKey } from "./base";
import { createPayment } from "../features/orderSlice";

function Checkout({ cartPrice }) {
  const { address } = useSelector((state) => state.address);
  const [addressId, setAddressId] = useState("");
  let navigate = useNavigate();

  const { orderLoading, message } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message === "Payment successful! Check email for details") {
      dispatch(placeOrder(addressId));
    }
    if (message === "order successfully placed") {
      dispatch(resetCart());
      dispatch(fetchProducts());
      navigate("/profile");
    }
  }, [message]);
  function handlePayment(token) {
    dispatch(createPayment(token, cartPrice));
  }
  return (
    <>
      {message && (
        <Alert
          message={message}
          color="primary"
          onClose={() => dispatch(setMessage(null))}
        />
      )}
      <h2>Order Summary</h2>
      <div className="wrapper">
        <p className="muted">Final Amout</p>
        <p className="muted">₹ {Number(cartPrice) + 50}</p>
      </div>
      <div className="wrapper">
        <p>select address</p>
        <select
          name="address"
          value={addressId}
          onChange={(e) => setAddressId(e.target.value)}
          className="coupen"
        >
          <option defaultValue value="">
            Select
          </option>
          {address &&
            address.map(
              (i) =>
                i.address && (
                  <option key={i._id} value={i._id}>
                    {i.address},{i.pincode}
                  </option>
                )
            )}
        </select>
      </div>
      {orderLoading ? (
        <p className="py-2 pb-2 fsz-2 bgc-success-100">
          placing your order please wait...
        </p>
      ) : addressId === "" && addressId !== "Select" ? (
        <>
          <button className="btn-primary">Pay now</button>
          <p className="c-danger mt-2">please select address</p>
        </>
      ) : (
        <StripeCheckout
          stripeKey={apiKey}
          token={handlePayment}
          amount={cartPrice}
          name="Farmers Grocery"
        />
      )}
    </>
  );
}
export { Checkout };
