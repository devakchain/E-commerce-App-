import React, { useContext, useEffect, useState } from "react";
import "../style/Navbar.css";

import _home from "../../public/home.png";
import _products from "../../public/products.png";
import _login from "../../public/login.png";
import _signup from "../../public/signup.png";
import _orders from "../../public/orders.png";
import _logout from "../../public/logout.png";
import burger from "../../public/burger.png";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartCotext";
import { getSuggestionsApi } from "../services/productServices";

// קומפוננטה פנימית ללינקים עם אייקון
function LinkWithIcon({ title, link, emoji, onClick }) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? "sidebar_link active" : "sidebar_link"
      }
      onClick={onClick}
    >
      {title} <img src={emoji} alt="icon" className="link_emoji" />
    </NavLink>
  );
}

function Navbar() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const user = useContext(userContext);
  const { cart } = useContext(cartContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isBurger, setIsBurger] = useState(false);

  function toggleBurger() {
    setIsBurger((prev) => !prev);
  }

  function closeMenu() {
    setIsBurger(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
      closeMenu();
    } else {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsApi(search)
          .then((res) => setSuggestions(res.data))
          .catch(() => setSuggestions([]));
      }
    }, 300);
    return () => clearTimeout(delaySuggestion);
  }, [search]);

  const handleKeyDown = (e) => {
    if (selectedItem < suggestions.length) {
      if (e.key === "ArrowDown") {
        setSelectedItem((current) =>
          current === suggestions.length - 1 ? 0 : current + 1
        );
      } else if (e.key === "ArrowUp") {
        setSelectedItem((current) =>
          current === 0 ? suggestions.length - 1 : current - 1
        );
      } else if (e.key === "Enter") {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
        closeMenu();
      }
    }
  };

  return (
    <>
      {/* כפתור המבורגר קבוע למעלה במובייל */}
      <img
        src={burger}
        alt="burger"
        className="burger"
        onClick={toggleBurger}
      />

      {/* אוברליי שחור ברקע לסגירת התפריט במובייל */}
      {isBurger && <div className="overlay" onClick={closeMenu}></div>}

      <nav
        className={`align_center navbar ${
          isBurger ? "navbar_show" : "navbar_hide"
        }`}
      >
        {/* כפתור סגירה ❌ בתוך התפריט */}
        <div className="close_btn" onClick={closeMenu}>
          ✕
        </div>

        {/* החלק העליון – לוגו וחיפוש */}
        <div className="align_center navbar_box1">
          <h1 className="navbar_heading">Shop</h1>
          <form className="align_center navbar_form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="navbar_search"
              placeholder="search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="search_button">
              Search
            </button>
            {suggestions.length > 0 && (
              <ul className="search_result">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={suggestion._id}
                    className={`search_suggestion_link ${
                      selectedItem === index ? "active" : ""
                    }`}
                  >
                    <Link
                      to={`/products?search=${suggestion.title}`}
                      onClick={() => {
                        setSearch("");
                        setSuggestions([]);
                        closeMenu();
                      }}
                    >
                      {suggestion.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* לינקים ניווט */}
        <div className="align_center navbar_links">
          <LinkWithIcon
            title="Home"
            link="/"
            emoji={_home}
            onClick={closeMenu}
          />
          <LinkWithIcon
            title="Products"
            link="/products"
            emoji={_products}
            onClick={closeMenu}
          />
          {!user && (
            <>
              <LinkWithIcon
                title="Login"
                link="/login"
                emoji={_login}
                onClick={closeMenu}
              />
              <LinkWithIcon
                title="SignUp"
                link="/signup"
                emoji={_signup}
                onClick={closeMenu}
              />
            </>
          )}
          {user && (
            <>
              <LinkWithIcon
                title="My Orders"
                link="/myorders"
                emoji={_orders}
                onClick={closeMenu}
              />
              <LinkWithIcon
                title="Logout"
                link="/logout"
                emoji={_logout}
                onClick={closeMenu}
              />
              <NavLink to="/cart" className="align_center" onClick={closeMenu}>
                Cart <p className="align_center cart_counts">{cart?.length}</p>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
