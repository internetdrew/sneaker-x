import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty(prevQty => prevQty + 1);
    console.log(qty);
  };
  const decreaseQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
      console.log(qty);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
