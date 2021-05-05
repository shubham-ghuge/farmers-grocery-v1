import { useDataProvider } from "../contexts/useDataProvider";
import { GroceryCard } from "../components";

export const ProductsListing = () => {
  const { products } = useDataProvider();
  return (
    <div
      className={"d-flex nav-adjust"}
      style={{ flexWrap: "wrap", justifyContent: "center" }}
    >
      {products &&
        products.map((item) => <GroceryCard product={item} key={item._id} />)}
    </div>
  );
};
