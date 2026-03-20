import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStarted = () => {
    setShowProducts(true);
  };

  return (
    <div className="app-container">
      {showProducts ? (
        <ProductList />
      ) : (
        <div className="landing-page">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
          <AboutUs />
        </div>
      )}
    </div>
  );
}

export default App;