import React, { useContext, useEffect, useState } from "react";
import "../style/Navbar.css";
import LinkWithIcon from "./LinkWithIcon";

import _home from "../../public/home.png";
import _products from "../../public/products.png";
import _login from "../../public/login.png";
import _signup from "../../public/signup.png";
import _orders from "../../public/orders.png";
import _logout from "../../public/logout.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { cartContext } from "../context/cartCotext";
import { getSuggestionsApi } from "../services/productServices";

import burger from "../../public/burger.png";

function Navbar() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(-1);
  const navigate = useNavigate();

  const user = useContext(userContext);
  const { cart } = useContext(cartContext);
  const [suggestions, setSuggestions] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    } else {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    const delaySuggestion = setTimeout(() => {
      if (search.trim() !== "") {
        getSuggestionsApi(search)
          .then((res) => {
            setSuggestions(res.data);
          })
          .catch((err) => {
            setSuggestions([]);
          });
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
          current === suggestions.length - 1 ? 0 : current - 1
        );
      } else if (e.key === "Enter") {
        const suggestion = suggestions[selectedItem];
        navigate(`/products?search=${suggestion.title}`);
        setSearch("");
        setSuggestions([]);
      }
    } else {
      setSelectedItem(-1);
    }
  };

  const [isBurger, setIsBurger] = useState(false);

  function onBurger() {
    let navbar = document.querySelector(".navbar");
    let burger_2 = document.querySelector(".burger_2");
    if (isBurger) {
      navbar.classList.remove("navbar_show");
      navbar.classList.add("navbar_hide");
      setIsBurger(!isBurger);
      burger_2.style.display = "block";
      navbar.style.opacity = "0";
    } else if (!isBurger) {
      navbar.classList.remove("navbar_hide");
      navbar.classList.add("navbar_show");
      setIsBurger(!isBurger);
      burger_2.style.display = "none";
      navbar.style.opacity = "1";
    }
  }
  return (
    <>
      <img
        src={burger}
        alt="burger "
        className={`burger burger_2`}
        onClick={onBurger}
      />
      <nav className={`align_center navbar`}>
        <div className="burger">
          <img
            src={burger}
            alt="burger"
            className={`burger`}
            onClick={onBurger}
          />
        </div>
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
                {suggestions?.map((suggestion, index) => {
                  return (
                    <li
                      className={
                        selectedItem === index
                          ? `search_suggestion_link active`
                          : `search_suggestion_link`
                      }
                      key={suggestion._id}
                    >
                      <Link
                        to={`/products?search=${suggestion.title}`}
                        onClick={() => {
                          setSearch("");
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </form>
        </div>
        <div className="align_center navbar_links">
          <LinkWithIcon title="Home" link="/" emoji={_home} />
          <LinkWithIcon title="Products" link="/products" emoji={_products} />
          {!user && (
            <>
              <LinkWithIcon title="Login" link="/login" emoji={_login} />
              <LinkWithIcon title="SignUp" link="/signup" emoji={_signup} />
            </>
          )}
          {user && (
            <>
              <LinkWithIcon
                title="My Orders"
                link="/myorders"
                emoji={_orders}
              />
              <LinkWithIcon title="Logout" link="/logout" emoji={_logout} />
              <NavLink to="/cart" className="align_center">
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
