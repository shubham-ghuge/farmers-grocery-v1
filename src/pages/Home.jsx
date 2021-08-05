import React from "react";
import { FiCheckCircle, FiClock, FiHome } from "react-icons/fi";
import { Carousel } from "../components";
import { Footer } from "../components/Footer";
import "./index.css";
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
      <h2 className="home-heading">Categories of products we offer!</h2>
      <div className="category-layout">
        {categories.map((item, idx) => (
          <figure
            className="category-card2 bgc-success-100 p-4 bdrs-2"
            key={idx}
          >
            <img
              src={`https://farmers-grocery-v2.herokuapp.com/images/${item.url}`}
              alt="category"
            />
            <figcaption className="text-capitalize fw-700 text-center">
              {item.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="my-5">
        <h2 className="home-heading sticky-10">Why Choose us?</h2>
        <div className="feat-container">
          <div className="feat sticky-20">
            <FiHome className="icon" />
            <h3>Fresh Products</h3>
            <p>Directly from farm to you</p>
          </div>
          <div className="feat sticky-20">
            <FiCheckCircle className="icon" />
            <h3>Best Quality</h3>
            <p>That you can trust</p>
          </div>
          <div className="feat sticky-20">
            <FiClock className="icon" />
            <h3>On Time Delivery</h3>
            <p>Items delivered at the promised time</p>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
      <Footer />
    </>
  );
};
