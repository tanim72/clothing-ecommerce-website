import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Cart from "./cart/Cart";
import axios from "axios";
import CartQuantity from "./cart/CartQuantity";
import Mens from "./mens/Mens";
import Womens from "./womens/Womens";

function App() {
  const cartId = "pU6YrRuSDYwBchVp2p68";
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/cart/${cartId}`
        );
        let quantity = 0;
        data.items.forEach((item) => {
          quantity += item.quantity;
        });
        setNumberOfItemsInCart(quantity);
      } catch (error) {
        console.error(`Error fetching cart: ${error}`);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Router>
      <CartQuantity.Provider
        value={{ numberOfItemsInCart, setNumberOfItemsInCart }}
      >
        <Navbar />
        <Routes>
          {/* Other components
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/womens" element={<Womens />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/cart/:cartId" element={<Cart />} />
        </Routes>
      </CartQuantity.Provider>
    </Router>
  );
}

export default App;
