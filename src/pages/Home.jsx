import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../features/authSlice";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const { isUserLoggedIn, token, user } =
      JSON.parse(localStorage.getItem("login")) || {};
    if (isUserLoggedIn) {
      dispatch(setToken({ token, user }));
    }
  }, []);

  const categories = [
    { name: "honey", url: "honey.png" },
    { name: "nonVeg", url: "ham.png" },
    { name: "masala", url: "masala.png" },
    { name: "veg", url: "food.png" },
    { name: "eggs", url: "eggs.png" },
    { name: "fruit", url: "watermelon.png" },
    { name: "coffee", url: "coffee.png" },
  ];

  return (
    <>
      <section className="hero">
        <Link to="/store">
          <img
            src={`https://api-farmers-grocery.herokuapp.com/images/banner.jpg`}
            alt="banner"
          />
        </Link>
      </section>
      <div className="category-layout">
        {categories.map((item, idx) => (
          <Link to="/store" key={idx}>
            <figure className="category-card">
              <img
                src={`https://api-farmers-grocery.herokuapp.com/images/${item.url}`}
                alt="category"
              />
              <figcaption>{item.name}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
};
