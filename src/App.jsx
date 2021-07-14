import "./styles.css";
import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
} from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { setToken, logout } from "./features/authSlice";
import {
  fetchBag,
  fetchCartData,
  fetchProducts,
} from "./features/productSlice";
import { fetchAddress } from "./features/addressSlice";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);
  const { userLoginStatus } = useSelector((state) => state.auth);
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      dispatch(logout());
    }
    return Promise.reject(error);
  });
  useEffect(() => {
    const { isUserLoggedIn, token, user } =
      JSON.parse(localStorage.getItem("login")) || {};
    if (isUserLoggedIn) {
      dispatch(setToken({ token, user }));
    }
  }, []);

  useEffect(() => {
    if (userLoginStatus) {
      dispatch(fetchCartData());
      dispatch(fetchBag());
      dispatch(fetchAddress());
    }
  }, [userLoginStatus]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="nav-adjust"></div>
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
      </Routes>
    </div>
  );
}
