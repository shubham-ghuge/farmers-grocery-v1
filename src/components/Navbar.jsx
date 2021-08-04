import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo-trans.png";
import { useSelector } from "react-redux";
import { Search } from "./Search";

export function Navbar() {
  const [menu, setMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartSize, bagSize } = useSelector((state) => state.product);

  useEffect(() => {
    if (window.innerWidth >= 600) {
      setMenu(true);
    }
  }, [menu]);

  return (
    <header className="side-menu">
      <NavLink to="/" className="logo-img">
        <img src={logo} alt="logo" />
        Farmers Grocery
      </NavLink>
      <Search />
      <nav className={menu ? null : "d-none"}>
        <ul onClick={() => setMenu(false)}>
          <li>
            <NavLink
              to="/cart"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              <span className="icon">
                <FiShoppingCart />
              </span>
              cart
              {user && cartSize !== 0 && (
                <div className="badge">{cartSize}</div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bag"
              activeClassName="nav-link-active"
              className="nav-link"
            >
              <span className="icon">
                <FiShoppingBag />
              </span>
              bag
              {user && bagSize !== 0 && <div className="badge">{bagSize}</div>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="nav-link"
              activeClassName="nav-link-active"
            >
              <span className="icon">
                <FaUserCircle />
              </span>
              {user ? user : "log in"}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="menu-icon d-block d-sm-none">
        <input
          type="checkbox"
          className="menu-check-box"
          onChange={(event) => setMenu(event.currentTarget.checked)}
          checked={menu}
        />
        <label>
          <span></span>
        </label>
      </div>
    </header>
  );
}
