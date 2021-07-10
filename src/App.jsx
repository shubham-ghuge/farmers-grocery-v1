import "./styles.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDataProvider } from "./contexts/useDataProvider";
import { Navbar, Loader, Login, Register, PrivateRoute } from "./components";
import {
  Bag,
  Product,
  NotFound,
  Home,
  Cart,
  ProductsListing,
  Auth,
  Profile,
  Checkout,
} from "./pages";

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
        <Route path="/auth" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/store" element={<ProductsListing />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="*" element={<NotFound />} />
        <PrivateRoute path="/bag" element={<Bag />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/" element={<Checkout />} />
      </Routes>
    </div>
  );
}
