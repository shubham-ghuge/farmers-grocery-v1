import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

function Order() {
  let navigation = useNavigate();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);
  const { orderId } = useParams();
  const orderDetails = orders.filter((i) => i._id === orderId);

  function getProductDetails(productId) {
    const product = products.find((i) => i._id === productId) || {};
    return product;
  }

  return (
    <div className="bgc-base-100 w-70 order extra-margin mx-auto py-2 mb-6 pb-2 bdrs-2">
      <h3 className="fsz-2 m-4">Order Details</h3>
      {orderDetails.length === 0 ? (
        <h4 className="fsz-1">No order found</h4>
      ) : (
        orderDetails.map(
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
                  {_id}
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
                <>
                  <span>Products:</span>
                  <div className="flex-layout mt-4">
                    {products.length !== 0 &&
                      products.map((i) => {
                        const { _id, price, discount, imgUrl, name } =
                          i !== undefined && getProductDetails(i.productId);
                        if (! name) {
                          return <>Product Not Found.</>;
                        }
                        return (
                          <div className="w-sm-20" key={_id}>
                            <div
                              className="d-flex cursor-pointer"
                              onClick={() => navigation(`/product/${_id}`)}
                            >
                              <img
                                className="product-img h-20 bdrs-2"
                                src={imgUrl}
                                alt="product"
                              />
                              <div className="wrapper ml-3">
                                <h3 className="product-title">{name}</h3>
                                <h4> Quantity: {i.quantity}</h4>
                                <h4 className="product-price">
                                  Price: ₹
                                  {(price - (price * discount) / 100).toFixed(
                                    2
                                  )}
                                  <span className="strike">₹ {price}.00</span>
                                </h4>
                                <h4 className="product-discount">
                                  Discount: {discount}%
                                </h4>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              </div>
            );
          }
        )
      )}
    </div>
  );
}
export { Order };
