import { BiTrash, BiCart } from "react-icons/bi";
import { useDataProvider } from "../contexts/useDataProvider";
import { useNavigate } from "react-router-dom";
import { Jumbotron } from "../components";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export const Bag = () => {
  const navigation = useNavigate();
  const { bag, products, dispatch } = useDataProvider();
  const productsInBag = products.filter((item) => {
    return bag.find((i) => item._id === i);
  });
  return (
    <div className="bag-layout nav-adjust">
      {!productsInBag.length ? (
        <Jumbotron text="Bag" />
      ) : (
        productsInBag.map(
          ({
            _id,
            imgUrl,
            name,
            description,
            price,
            discount,
            isInCart,
            isInBag
          }) => (
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
                      dispatch({
                        type: "REMOVE_FROM_BAG",
                        payload: { _id: _id, status: isInBag }
                      });
                      toast(`${name} is removed from bag`);
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
                        : dispatch({
                            type: "ADD_TO_CART",
                            payload: { _id: _id, status: isInCart }
                          })
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
      <ToastContainer />
    </div>
  );
};
