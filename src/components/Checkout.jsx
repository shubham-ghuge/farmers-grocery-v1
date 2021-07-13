import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { placeOrder, setMessage } from "../features/orderSlice";
import { fetchProducts, resetCart } from "../features/productSlice";
import { Alert } from "./Alert";
import { Loader } from "./Loader";

function Checkout({ cartPrice }) {
  const { address } = useSelector((state) => state.address);
  const [addressId, setAddressId] = useState("");

  let navigate = useNavigate();

  const { orderLoading, message } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message === "order successfully placed") {
      dispatch(resetCart());
      dispatch(fetchProducts());
      navigate("/profile");
    }
  }, [message]);
  function orderHandler() {
    dispatch(placeOrder(addressId));
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
        >
          <option defaultValue>Select</option>
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
      <button className="coupen" onClick={() => navigate("/profile#address")}>
        Add new Address
      </button>
      <button className="btn-success" onClick={() => orderHandler()}>
        {orderLoading ? <Loader /> : "place order"}
      </button>
    </>
  );
}
export { Checkout };
