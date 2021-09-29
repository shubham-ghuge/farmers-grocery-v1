import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Jumbotron } from "../components";
import { fetchOrders } from "../features/orderSlice";

function OrderListing() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <div className="bgc-base-100 w-sm-60 py-2 mb-6 pb-2 bdrs-2">
      <h3 className="fsz-2">Your Orders</h3>
      {orders.length === 0 ? (
        <Jumbotron text="orders" />
      ) : (
        <div className="list-container bgc-base-100">
          {orders.map(
            ({
              _id,
              addressId: { address, pincode },
              products,
              deliveryStatus,
              paymentStatus,
            }) => {
              return (
                <div key={_id} className="list-item">
                  <p>
                    <span>Order id:</span>
                    <Link to={`/orders/${_id}`}>{_id}</Link>
                  </p>
                  <p>
                    <span>Address:</span>
                    {address} {pincode}
                  </p>
                  <p>
                    <span>Delivery Status:</span>
                    {deliveryStatus ? "delivered" : "pending"}
                  </p>
                  <p>
                    <span>Payment Status:</span>
                    {paymentStatus ? "done" : "pending"}
                  </p>
                  <p>
                    <span>Total Products:</span> {products.length}
                  </p>
                </div>
              );
            }
          ).reverse()}
        </div>
      )}
    </div>
  );
}
export { OrderListing };
