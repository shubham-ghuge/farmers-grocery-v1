import React, { useEffect, useState } from "react";
import { Alert, GroceryCard, Jumbotron } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilters,
  filterProducts,
  setMessage,
  setProducts,
  sortProducts,
} from "../features/productSlice";
import { GrFilter } from "react-icons/gr";

export const ProductsListing = () => {
  const [toggle, setToggle] = useState(false);
  const {
    products,
    message,
    filteredData,
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
    if (window.innerWidth >= 800) {
      setToggle(true);
    }
    return () => setToggle(false);
  }, [window.innerWidth]);

  useEffect(() => {
    if (filterBySort !== "") {
      const sortedData = sortByLow(products, filterBySort);
      dispatch(setProducts(sortedData));
    }
  }, [filterBySort]);

  useEffect(() => {
    if (filterCategoryData.length !== 0) {
      const data = products;
      dispatch(setProducts(filterProductsByCategory(data)));
    } else {
      dispatch(setProducts([]));
    }
  }, [filterCategoryData]);

  return (
    <div className="d-flex jc-center ai-flex-start extra-margin">
      <button
        className="filter-btn d-flex jc-center"
        onClick={() => setToggle((curr) => !curr)}
      >
        {toggle ? (
          <>close filters</>
        ) : (
          <>
            show filters
            <GrFilter className="fsz-1 ml-2" />
          </>
        )}
      </button>
      {toggle && (
        <div className="filters jc-center bdrs-2">
          <button
            className="btn-c-primary"
            onClick={() => dispatch(clearFilters())}
          >
            clear filters
          </button>
          <div className="wrapper">
            <div className="mr-2 mb-2">
              <p className="fsz-1 fw-500 text-capitalize">Sort by Price</p>
              <div className="d-flex ai-center">
                <label htmlFor="high">
                  <input
                    type="radio"
                    name="sort"
                    id="high"
                    value="HIGH"
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
                    value="LOW"
                    checked={filterBySort === "LOW"}
                    onChange={() => dispatch(sortProducts("LOW"))}
                  />{" "}
                  Low to High
                </label>
              </div>
            </div>
            <div className="">
              <p className="fsz-1 fw-500 text-capitalize">
                filter by categories
              </p>
              <div className="flex-layout flex-sm-column mt-2">
                {categories &&
                  categories.map((category) => (
                    <label htmlFor={category._id} key={category._id}>
                      <input
                        type="checkbox"
                        name="sort"
                        id={category._id}
                        checked={filterCategoryData.includes(category._id)}
                        value={category._id}
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
          </div>
        </div>
      )}
      <div className="flex-layout jc-center ai-flex-start products">
        {message && (
          <Alert
            message={message}
            color="primary"
            onClose={() => dispatch(setMessage("message"))}
          />
        )}
        {filteredData.length === 0 && filterCategoryData.length === 0 ? (
          products.map((item) => <GroceryCard product={item} key={item._id} />)
        ) : filteredData.length === 0 ? (
          <Jumbotron onlyText="no products available" />
        ) : (
          filteredData.map((item) => (
            <GroceryCard product={item} key={item._id} />
          ))
        )}
      </div>
    </div>
  );
};
