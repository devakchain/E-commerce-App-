import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import SingleProductPage from "./components/SingleProductPage";
import CartPage from "./components/CartPage";
import MyOrder from "./components/MyOrder";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

import { Routes, Route } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import LogOut from "./components/LogOut";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./setAuthToken";
import {
  addToCartApi,
  decreaseProductApi,
  getCartApi,
  increaseProductApi,
  removeFromCartApi,
} from "./services/cartServices";

import { ToastContainer, toast } from "react-toastify";
import { userContext } from "./context/userContext";
import { cartContext } from "./context/cartCotext";
import ProtectedRoutes from "./ProtectedRoutes";

setAuthToken(getJwt());

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtDecode.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = useCallback(
    (product, quantity) => {
      const updateCart = Array.isArray(cart) ? [...cart] : [];
      const productIndex = updateCart.findIndex(
        (item) => item.product._id === product._id
      );
      if (productIndex === -1) {
        updateCart.push({ product: product, quantity: quantity });
      } else {
        updateCart[productIndex].quantity += quantity;
      }
      setCart(updateCart);

      addToCartApi(product._id, quantity)
        .then(() => {
          toast.success("Product added successfully");
        })
        .catch((err) => {
          toast.error("Failed to add product");
          setCart(cart); // חזרה לקודם במקרה כשל
        });
    },
    [cart]
  );

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const removeFromCart = useCallback(
    async (id) => {
      const oldCart = Array.isArray(cart) ? [...cart] : [];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);

      removeFromCartApi(id).catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    },
    [user]
  );

  const getCart = useCallback(async () => {
    try {
      const res = await getCartApi();
      const data = Array.isArray(res.data) ? res.data : res.data.cart || [];
      setCart(data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [cart]);

  const updateCart = useCallback(
    (type, id) => {
      const oldCart = [...cart];
      const updatedCart = Array.isArray(cart) ? [...cart] : [];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (productIndex === -1) return;

      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;

        increaseProductApi(id).catch((err) => {
          toast.error("Something went wrong");
          setCart(oldCart);
        });
      } else if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        decreaseProductApi(id).catch((err) => {
          toast.error("Something went wrong");
          setCart(oldCart);
        });
      }
      setCart(updatedCart);
    },
    [cart]
  );

  return (
    <userContext.Provider value={user}>
      <cartContext.Provider
        value={{ cart, addToCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-left" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route
                path="/products/product/:id"
                element={<SingleProductPage />}
              />
              <Route path="/signUp" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/myOrders" element={<MyOrder />} />
                <Route path="/Logout" element={<LogOut />} />
              </Route>
              <Route path="/*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </cartContext.Provider>
    </userContext.Provider>
  );
}

export default App;
