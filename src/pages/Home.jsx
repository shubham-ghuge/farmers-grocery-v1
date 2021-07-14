import { Link } from "react-router-dom";
import React from "react";
import { Carousel } from "../components";

export const Home = () => {
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
        <Carousel />
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
