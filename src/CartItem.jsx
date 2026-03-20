import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const itemCost = parseFloat(item.cost.substring(1)); 
      total += itemCost * item.quantity;
    });
    return total;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1));
    return itemCost * item.quantity;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.name}</div>
                <div>Unit Price: {item.cost}</div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '1rem', cursor: 'pointer' }}>-</button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '1rem', cursor: 'pointer' }}>+</button>
                </div>
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</div>
              </div>
              <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
        <button 
          onClick={onContinueShopping} 
          style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => alert('Checkout functionality coming soon!')} 
          style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer', fontSize: '1.1rem' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;