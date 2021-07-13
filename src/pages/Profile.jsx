import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Address, Jumbotron } from "../components";
import { fetchOrders } from "../features/orderSlice";

function Profile() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  function getProductName(productId) {
    const product = products.find((i) => i._id === productId);
    return product.name;
  }
  useEffect(() => {
    dispatch(fetchOrders());
  }, []);
  return (
    <div className="p-4">
      <h3 className="fsz-2">Your Profile</h3>
      <h4 className="fsz-1 m-3">
        Name : <span className="fw-400">{user}</span>
      </h4>
      <h3 className="fsz-2">Your Orders</h3>
      {orders.length === 0 ? (
        <Jumbotron text="orders" />
      ) : (
        orders.map(({ address, products }, idx) => {
          return (
            <div className="list-container bgc-base-100 w-90 w-sm-50" key={idx}>
              <h3 className="fw-600 m-3">Address: {address}</h3>
              <>
                <ul className="list">
                  {products.map((j) => (
                    <li className="list-item" key={j._id}>
                      <p>
                        <span className="fw-500">Product Name: </span>
                        {getProductName(j.productId)}
                      </p>
                      <p>
                        <span className="fw-500">Quantity: </span>
                        {j.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            </div>
          );
        })
      )}
      <Address />
    </div>
  );
}
export { Profile };
