import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import logo from "../assets/logo-trans.png";
export const Navbar = () => {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (window.innerWidth >= 600) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }, []);
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
        <nav className={menu ? "d-block" : "d-none"}>
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
      {/* extract search component */}
      <div className="input-addon-success mobile-search d-block d-sm-none">
        <span className="icon">
          <FiSearch />
        </span>
        <input type="search" placeholder="Search Products, Brands & More" />
      </div>
    </>
  );
};
