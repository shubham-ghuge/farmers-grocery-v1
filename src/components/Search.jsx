import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./components.module.css";

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const { products } = useSelector((state) => state.product);
  const productNames = products.map((i) => ({
    name: i.name,
    id: i._id,
  }));

  function findProduct(productName) {
    const data = productNames.filter((i) =>
      i.name.toLowerCase().includes(productName)
    );
    setSearchResult(data);
  }

  return (
    <>
      <div className="input-addon-success d-none d-sm-block" tabIndex="1">
        <span className="icon">
          <FiSearch />
        </span>
        <input
          type="search"
          value={userInput}
          placeholder="Search Products, Brands & More"
          onInput={(e) => setUserInput(e.target.value)}
          onChange={(e) => findProduct(e.target.value)}
        />
      </div>
      {userInput !== "" && (
        <div className={styles.searchResults}>
          {searchResult.length !== 0
            ? searchResult.map((i, idx) => (
                <p onClick={() => setUserInput("")}>
                  <Link
                    className={styles.cLink}
                    to={`product/${i.id}`}
                    key={idx}
                  >
                    {i.name}
                  </Link>
                </p>
              ))
            : "no results found"}
        </div>
      )}
    </>
  );
}
export { Search };
