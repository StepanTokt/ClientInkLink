export const addToCart = (cartItems, setCartItems, itemToAdd) => {
    const isItemInCart = cartItems.find((item) => item.id === itemToAdd.id);
  
    if (isItemInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      saveCartToSessionStorage(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...itemToAdd, quantity: 1 }];
      setCartItems(updatedCartItems);
      saveCartToSessionStorage(updatedCartItems);
    }
  };

  export const removeFromCart = (cartItems, setCartItems, itemToRemove) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== itemToRemove.id
    );
    setCartItems(newCartItems);
  };

  export const saveCartToSessionStorage = (cartItems) => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  };
  
  export const getCartFromSessionStorage = () => {
    const cart = sessionStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  