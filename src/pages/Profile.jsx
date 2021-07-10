import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../features/orderSlice";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <>
      <h1>Your Profile</h1>
    </>
  );
}
export { Profile };
