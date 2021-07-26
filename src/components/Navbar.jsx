import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo-trans.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.product);
  useEffect(() => {
    if (window.innerWidth >= 600) {
      setMenu(true);
    }
  }, [menu]);
  return (
    <>
      <header className="side-menu">
        <NavLink to="/" className="logo-img">
          <img src={logo} alt="logo" />
          Farmers Grocery
        </NavLink>
        <div className="input-addon-success d-none d-sm-block" tabIndex="1">
          <span className="icon">
            <FiSearch />
          </span>
          <input type="search" placeholder="Search Products, Brands & More" />
        </div>
        <nav className={menu ? null : "d-none"}>
          <ul>
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
                {cart.length !== 0 && (
                  <div className="badge">{cart.length}</div>
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
    </>
  );
};
