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
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./features/authSlice";
import {
  fetchCartData,
  fetchProducts,
  fetchWishlistData,
} from "./features/productSlice";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);
  const { userLoginStatus } = useSelector((state) => state.auth);
  useEffect(() => {
    const { isUserLoggedIn, token, user } =
      JSON.parse(localStorage.getItem("login")) || {};
    if (isUserLoggedIn) {
      dispatch(setToken({ token, user }));
    }
  }, []);

  useEffect(() => {
    console.log(userLoginStatus);
    if (userLoginStatus) {
      dispatch(fetchCartData());
      dispatch(fetchWishlistData());
    }
  }, [userLoginStatus]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="App">
      <Navbar />
      {loading && <Loader />}
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
