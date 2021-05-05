import "./styles.css";
import { Navbar, Loader } from "./components";
import { Route, Routes } from "react-router-dom";
import { Cart } from "./pages/Cart";
import { Bag } from "./pages/Bag";
import { Product } from "./pages/Product";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { ProductsListing } from "./pages/ProductsListing";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDataProvider } from "./contexts/useDataProvider";

export default function App() {
  const [loader, setLoader] = useState(false);
  const { dispatch } = useDataProvider();
  useEffect(() => {
    async function loadDataFromDb() {
      setLoader(true);
      try {
        const { data } = await axios.get(
          "https://api-farmers-grocery.herokuapp.com/products"
        );
        dispatch({ type: "INITIALISE_DATA", payload: data.data });
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    }
    loadDataFromDb();
  }, []);
  return (
    <div className="App">
      <Navbar />
      {loader && <Loader />}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/bag"} element={<Bag />} />
        <Route path={"/store"} element={<ProductsListing />} />
        <Route path={"/product/:productId"} element={<Product />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}
