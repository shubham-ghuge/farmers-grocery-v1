import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address, Jumbotron, UserInfo } from "../components";
import { fetchOrders } from "../features/orderSlice";

function Profile() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  function getProductDetails(productId) {
    const product = products.find((i) => i._id === productId);
    return product;
  }
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <div className="user-profile extra-margin mx-auto py-4 bdrs-2">
      <UserInfo />
      <div className="bgc-base-100 py-2 mb-2 pb-2 bdrs-2">
        <h3 className="fsz-2">Your Orders</h3>
        {orders.length === 0 ? (
          <Jumbotron text="orders" />
        ) : (
          <div className="list-container bgc-base-100">
            {orders.map(
              ({ _id, addressId: { address, pincode }, products }) => {
                return (
                  <div key={_id} className="list-item">
                    <p>order id:{_id}</p>
                    <p>
                      Address: {address} {pincode}
                    </p>
                    <p>Delivery Status: delivered</p>
                    <p>Total Products:{products.length}</p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
      <Address />
    </div>
  );
}
export { Profile };
