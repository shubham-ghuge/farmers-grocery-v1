import React from "react";
import { BiTrash, BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Jumbotron } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addInCart, removeFromBag } from "../features/productSlice";

export const Bag = () => {
  const navigation = useNavigate();
  const { bag, products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const productsInBag = products.filter((item) => {
    return bag.find((i) => item._id === i);
  });

  return (
    <div className="bag-layout nav-adjust">
      {!productsInBag.length ? (
        <Jumbotron text="Bag" />
      ) : (
        productsInBag.map(
          ({ _id, imgUrl, name, description, price, discount, isInCart }) => (
            <figure className="wishlist-card" key={_id}>
              <img src={imgUrl} alt="product" />
              <figcaption>
                <h3 className="wishlist-card-header">{name}</h3>
                <p className="wishlist-card-description">{description}</p>
                <div className="wishlist-card-price">
                  <h4>₹{(price - (price * discount) / 100).toFixed(2)}</h4>
                  <p className="muted strike">₹{price.toFixed(2)}</p>
                  <p className="text-danger">{discount}%</p>
                </div>
                <div className="wrapper">
                  <button
                    className="btn-outline-danger btn-addon"
                    onClick={() => {
                      dispatch(removeFromBag(_id));
                    }}
                  >
                    <span className="icon">
                      <BiTrash />
                    </span>
                  </button>
                  <button
                    className={
                      isInCart
                        ? "cta btn-success-active btn-addon"
                        : "cta btn-success btn-addon"
                    }
                    onClick={() =>
                      isInCart
                        ? navigation("/cart")
                        : dispatch(
                            addInCart({
                              productDetails: { productId: _id, quantity: 1 },
                            })
                          )
                    }
                  >
                    <span className="icon" style={{ margin: "0 0.25rem 0 0" }}>
                      <BiCart />
                    </span>
                    {isInCart ? "Go To Cart" : "Add To Cart"}
                  </button>
                </div>
              </figcaption>
            </figure>
          )
        )
      )}
    </div>
  );
};
