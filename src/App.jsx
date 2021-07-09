import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDataProvider } from "./contexts/useDataProvider";
import { Navbar, Loader } from "./components";
import { Bag, Product, NotFound, Home, Cart, ProductsListing } from "./pages";

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
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/store" element={<ProductsListing />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
