import { Link } from "react-router-dom";

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
          <img src={`https://api-farmers-grocery.herokuapp.com/images/banner.jpg`} alt="banner" />
        </Link>
      </section>
      <div className="category-layout">
        {categories.map((item, idx) => (
          <Link to="/store" key={idx}>
            <figure className="category-card">
              <img src={`https://api-farmers-grocery.herokuapp.com/images/${item.url}.png`} alt="category" />
              <figcaption>{item.name}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
};
