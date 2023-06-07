import React, { useState } from 'react';
import './App.css';
import StripeContainer from './pages/checkout/StripeContainer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [showItem, setShowItem] = useState(false);
  return (
    <>
    <h1>Pay With Stripe</h1>
      <Router>
      <Routes>
					<Route path="/" element={<StripeContainer />} />
       </Routes>
      </Router>
    </>
    // <div style={{ textAlign: 'center' }}>
    //   <h1>The Spatula Store</h1>
    //   {showItem ? <stripeContainer /> : <><h3>$10.00</h3> <button onClick= {() => setShowItem(true)}>Purchase Spatula</button> </>}
    // </div>
  );
}

export default App;
