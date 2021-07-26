import React, { useEffect, useState } from "react";
import styles from "./components.module.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import { AiOutlineShop } from "react-icons/ai";
import { useNavigate } from "react-router";

function Carousel() {
  let navigate = useNavigate();
  const [tagline, setTagline] = useState([
    {
      text: "Farm Fresh Fruits and veggies at lowest prices",
      bgc: "linear-gradient(to right, #fe8c00, #f83600)",
    },
    {
      text: "blockbuster and biggest saving deals",
      bgc: "linear-gradient(to right, #000046, #1cb5e0)",
    },
    {
      text: "food and beverages upto 12% off",
      bgc: "linear-gradient(to right, #ff0099, #493240)",
    },
  ]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((curr) => (curr >= tagline.length-1 ? 1 : curr + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div
      className={styles.carouselContainer}
      style={{ background: tagline[currentIndex].bgc }}
    >
      <button
        className={styles.actionsPrev}
        onClick={() =>
          setCurrentIndex((curr) =>
            curr > tagline.length ? curr - 1 : tagline.length - 1
          )
        }
      >
        <GrPrevious />
      </button>
      <div className={styles.carouselBody} onClick={() => navigate("/store")}>
        <h3 className={styles.text}>{tagline[currentIndex].text}</h3>
        <button className={styles.cta}>
          shop now{" "}
          <span>
            <AiOutlineShop />
          </span>
        </button>
      </div>
      <button
        className={styles.actionsNext}
        onClick={() =>
          setCurrentIndex((curr) => (curr < tagline.length - 1 ? curr + 1 : 0))
        }
      >
        <GrNext />
      </button>
    </div>
  );
}
export { Carousel };
