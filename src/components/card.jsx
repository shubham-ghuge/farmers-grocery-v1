import { FiShoppingBag } from "react-icons/fi";
import { useDataProvider } from "../contexts/useDataProvider";
import { useNavigate, Link } from "react-router-dom";

export function GroceryCard({ product }) {
  const { dispatch } = useDataProvider();
  let navigation = useNavigate();
  const addToCartHandler = (productId, productStatus) => {
    if (productStatus === false) {
      return dispatch({
        type: "ADD_TO_CART",
        payload: { _id: productId, status: productStatus }
      });
    } else {
      return navigation("/cart");
    }
  };
  return (
    <div className={"grocery-card"}>
      <Link to={`/product/${product._id}`}>
        <div className={"card-thumbnail"}>
          <img src={product.imgUrl} alt={"product"} />
        </div>
      </Link>
      <span
        className={product.isInBag ? "icon-active" : "icon"}
        onClick={() =>
          dispatch({
            type: "ADD_TO_BAG",
            payload: { _id: product._id, status: product.isInBag }
          })
        }
      >
        <FiShoppingBag />
      </span>
      <div className={"card-details"}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigation(`/product/${product._id}`)}
        >
          <h3 className={"card-header"}>{product.name}</h3>
          <span className={"badge-rect-danger"}>{product.discount}% OFF</span>
          <p className={"card-price"}>
            &#x20b9;
            {Math.floor(
              product.price - (product.price * product.discount) / 100
            )}
            .00
            <span className={"strike"}>MRP ₹ {product.price}.00</span>
          </p>
        </div>
      </div>
      <button
        className={product.isInCart ? "card-cta-active" : "card-cta"}
        onClick={() => addToCartHandler(product._id, product.isInCart)}
      >
        {product.isInCart ? "Go to Cart" : "Add To Cart"}
      </button>
    </div>
  );
}
