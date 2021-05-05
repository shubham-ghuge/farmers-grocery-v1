import { Link } from "react-router-dom";
import {
  banner,
  honey,
  nonVeg,
  masala,
  veg,
  eggs,
  fruit,
  coffee
} from "../assets";
export const Home = () => {
  const categories = [
    { name: "honey", url: honey },
    { name: "nonVeg", url: nonVeg },
    { name: "masala", url: masala },
    { name: "veg", url: veg },
    { name: "eggs", url: eggs },
    { name: "fruit", url: fruit },
    { name: "coffee", url: coffee }
  ];

  return (
    <>
      <section className="hero">
        <Link to="/store">
          <img src={banner} alt="banner" />
        </Link>
      </section>
      <div className="category-layout">
        {categories.map((item, idx) => (
          <Link to="/store" key={idx}>
            <figure className="category-card">
              <img src={item.url} alt="category" />
              <figcaption>{item.name}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
};
