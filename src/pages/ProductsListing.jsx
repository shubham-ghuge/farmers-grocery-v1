import React, { useEffect } from "react";
import { Alert, GroceryCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  filterProducts,
  setMessage,
  setProducts,
  sortProducts,
} from "../features/productSlice";

export const ProductsListing = () => {
  const {
    products,
    message,
    initialData,
    categories,
    filterBySort,
    filterCategoryData,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  function sortByLow(data, type) {
    return [...data].sort((a, b) =>
      type === "LOW" ? a.price - b.price : b.price - a.price
    );
  }
  function filterProductsByCategory(data) {
    return data.filter((product) =>
      filterCategoryData.includes(product.categoryId)
    );
  }

  useEffect(() => {
    if (filterBySort !== "") {
      const sortedData = sortByLow(products, filterBySort);
      dispatch(setProducts(sortedData));
    }
  }, [filterBySort]);

  useEffect(() => {
    if (filterCategoryData.length !== 0) {
      dispatch(setProducts(filterProductsByCategory(initialData)));
    } else {
      dispatch(setProducts(initialData));
    }
  }, [filterCategoryData]);

  return (
    <div className="d-flex extra-margin">
      <div className="filters mt-7">
        <button
          className="btn-c-primary"
          onClick={() => dispatch(clearFilters())}
        >
          clear filters
        </button>
        <label htmlFor="high">
          <input
            type="radio"
            name="sort"
            id="high"
            checked={filterBySort === "HIGH"}
            onChange={() => dispatch(sortProducts("HIGH"))}
          />
          High to low
        </label>
        <label htmlFor="low">
          <input
            type="radio"
            name="sort"
            id="low"
            checked={filterBySort === "LOW"}
            onChange={() => dispatch(sortProducts("LOW"))}
          />{" "}
          Low to High
        </label>
        <h2>Categories</h2>
        <div className="parent">
          {categories &&
            categories.map((category) => (
              <label htmlFor={category._id} key={category._id}>
                <input
                  type="checkbox"
                  name="sort"
                  id={category._id}
                  checked={filterCategoryData.includes(category._id)}
                  onChange={(e) =>
                    dispatch(
                      filterProducts({
                        id: category._id,
                        status: e.target.checked,
                      })
                    )
                  }
                />{" "}
                {category.name}
              </label>
            ))}
        </div>
      </div>
      <div className="flex-layout jc-center">
        {message && (
          <Alert
            message={message}
            color="primary"
            onClose={() => dispatch(setMessage("message"))}
          />
        )}
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((item) => <GroceryCard product={item} key={item._id} />)
        )}
      </div>
    </div>
  );
};
