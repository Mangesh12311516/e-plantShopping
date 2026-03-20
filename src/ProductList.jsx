import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1628170341772-44a1b5c468e2?q=80&w=500&auto=format&fit=crop", cost: "$15.00" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1596547609652-9cb5d8d73929?q=80&w=500&auto=format&fit=crop", cost: "$12.00" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?q=80&w=500&auto=format&fit=crop", cost: "$18.00" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=500&auto=format&fit=crop", cost: "$14.00" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1597055181308-e2ebba184518?q=80&w=500&auto=format&fit=crop", cost: "$20.00" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547610014-4328eb97af76?q=80&w=500&auto=format&fit=crop", cost: "$10.00" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1599811804705-728b78809c91?q=80&w=500&auto=format&fit=crop", cost: "$12.00" },
        { name: "Echeveria", image: "https://images.unsplash.com/photo-1588691888049-7bce050b18fa?q=80&w=500&auto=format&fit=crop", cost: "$8.00" },
        { name: "Zebra Plant", image: "https://images.unsplash.com/photo-1602931206132-736b0cc652a6?q=80&w=500&auto=format&fit=crop", cost: "$9.00" },
        { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1629235084931-e1cbfa1f337a?q=80&w=500&auto=format&fit=crop", cost: "$14.00" },
        { name: "String of Pearls", image: "https://images.unsplash.com/photo-1620127598813-f42f6b8c8d8c?q=80&w=500&auto=format&fit=crop", cost: "$16.00" },
        { name: "Panda Plant", image: "https://images.unsplash.com/photo-1605330386629-873b88b2eb6e?q=80&w=500&auto=format&fit=crop", cost: "$11.00" }
      ]
    },
    {
      category: "Low Light Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1608677464016-86c075cc919b?q=80&w=500&auto=format&fit=crop", cost: "$22.00" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1616059868770-34d63229b110?q=80&w=500&auto=format&fit=crop", cost: "$13.00" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1636141386762-b91a8ddff6c3?q=80&w=500&auto=format&fit=crop", cost: "$25.00" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1596547610014-4328eb97af76?q=80&w=500&auto=format&fit=crop", cost: "$19.00" },
        { name: "Parlor Palm", image: "https://images.unsplash.com/photo-1623861878023-bc2a2f643e06?q=80&w=500&auto=format&fit=crop", cost: "$17.00" },
        { name: "Philodendron", image: "https://images.unsplash.com/photo-1613524683056-b040a4cf0b89?q=80&w=500&auto=format&fit=crop", cost: "$15.00" }
      ]
    }
  ];

  const isAddedToCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#4CAF50', color: 'white' }}>
        <h2 style={{ margin: 0 }}>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>Plants</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }} style={{ color: 'white', textDecoration: 'none', fontSize: '1.2rem' }}>
            🛒 Cart ({totalCartItems})
          </a>
        </div>
      </div>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{category.category}</h2>
              <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div className="product-title" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>{plant.name}</div>
                    <div className="product-price" style={{ marginBottom: '15px', fontSize: '1.1rem' }}>{plant.cost}</div>
                    <button 
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAddedToCart(plant.name)}
                      style={{ 
                        backgroundColor: isAddedToCart(plant.name) ? '#ccc' : '#4CAF50', 
                        color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', 
                        cursor: isAddedToCart(plant.name) ? 'not-allowed' : 'pointer', width: '100%', fontSize: '1rem'
                      }}
                    >
                      {isAddedToCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;