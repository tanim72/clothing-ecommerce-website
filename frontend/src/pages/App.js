import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Cart from './cart/Cart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Other components
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/cart/:cartId" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;

