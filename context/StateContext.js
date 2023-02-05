import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  const addToCart = (product, quantity) => {
    const productAlreadyInCart = cartItems.find(
      item => item._id === product._id
    );

    if (productAlreadyInCart) {
      setTotalPrice(prevPrice => prevPrice + product.price * quantity);
      setTotalQuantities(prevQty => prevQty + quantity);

      const updatedCartItems = cartItems.map(cartItem => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    }

    if (!productAlreadyInCart) {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(
      `${qty} ${product.name}${qty > 1 ? 's' : ''} added to cart.`,
      { duration: 4000 }
    );
  };

  const increaseQty = () => {
    setQty(prevQty => prevQty + 1);
  };
  const decreaseQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
