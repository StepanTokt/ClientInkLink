import React, { useState } from 'react';
import Basket from './Basket';
import { addToCart } from './cartUtils'

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    addToCart(cartItems, setCartItems, item);
  };

  return (
    <div>
      <Basket cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default ParentComponent;
