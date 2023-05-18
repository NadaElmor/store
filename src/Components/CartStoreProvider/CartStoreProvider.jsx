import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();

function CartStoreProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [CartID, setCartID] = useState(null);
  const navigate = useNavigate();

  async function addToCart(proId) {
    try {
      const { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          productId: proId,
        },
        { headers: { token: localStorage.getItem("user") } }
      );
     // console.log(data);
      if (data.status == "success") {
        setCartID(data.data._id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error" + error);
    }
  }
  async function getUserCart() {
    try {
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      // console.log(data);

      if (data.status === "success") {
        setProducts(data.data.products);
        setCartID(data.data._id);
        setNumOfProducts(data.numOfCartItems);
        settotalPrice(data.data.totalCartPrice);
        //console.log(data.data.products);
        //console.log(products);
      }
    } catch (error) {
      console.log(" error" + error);
      $("#cart-msg").fadeIn(1000, function () {
        setTimeout(() => {
          $("#cart-msg").fadeOut(1000);
          navigate("/home");
        }, 1000);
      });
    }
  }
  async function upadateProductCount(id, cnt) {
    try {
      const { data } = await axios.put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
        { count: cnt },
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      console.log(data);
      setProducts(data.data.products);
      settotalPrice(data.data.totalCartPrice);
    } catch (error) {
      console.log("error " + error);
    }
  }
  async function removeProduct(id) {
    try {
      const { data } = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("user"),
          },
        }
      );
      console.log(data);
      setProducts(data.data.products);
    } catch (error) {
      console.log("error" + error);
    }
  }
  async function clearUserCart() {
    try {
      const { data } = await axios.delete(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          headers: { token: localStorage.getItem("user") },
        }
      );
      // console.log(data);
      if (data.message == "success") {
        setProducts([]);
        setCartID(null);
        setNumOfProducts(0);
        settotalPrice(0);
      }
    } catch (error) {
      console.log("error" + error);
    }
  }
  function clearData(){
    setCartID(null);
    setNumOfProducts(0);
    setProducts(null);
    settotalPrice(0);
  }
  useEffect(function () {
    getUserCart();
  }, []);
  return (
    <CartContext.Provider
      value={{getUserCart,
        addToCart,
        products,
        numOfProducts,
        totalPrice,
        upadateProductCount,
        removeProduct,
        clearUserCart,CartID,clearData
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartStoreProvider;
