import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsInCartQty, setItemsInCartQty] = useState(0);
  const [qty, setQty] = useState(1);

  const addToCart = (product, quantity) => {
    const productAlreadyInCart = cartItems.find(
      item => item._id === product._id
    );

    if (productAlreadyInCart) {
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
    setTotalPrice(prevPrice => prevPrice + product.price * quantity);
    setItemsInCartQty(prevQty => prevQty + quantity);

    toast.success(
      `${qty} ${product.name}${qty > 1 ? 's' : ''} added to cart.`,
      { duration: 4000 }
    );
    setQty(1);
  };

  const removeItemFromCart = id => {
    const item = cartItems.find(item => item._id === id);
    const otherItems = cartItems.filter(item => item._id !== id);
    setCartItems(otherItems);
    setTotalPrice(prevTotal => prevTotal - item.price * item.quantity);
    setItemsInCartQty(prevQty => prevQty - item.quantity);
  };

  const changeCartItemQty = (id, value) => {
    const item = cartItems.find(item => item._id === id);
    const otherCartItems = cartItems.filter(item => item._id !== id);

    if (value === 'increase') {
      item.quantity += 1;
      setTotalPrice(prevTotal => prevTotal + item.price);
      setItemsInCartQty(prevQty => prevQty + 1);
    }

    if (value === 'decrease') {
      if (item.quantity > 1) {
        console.log(item);
        item.quantity -= 1;
        setTotalPrice(prevTotal => prevTotal - item.price);
        setItemsInCartQty(prevQty => prevQty - 1);
        console.log(cartItems);
      }
    }

    // index = cartItems.findIndex(product => product._id === id);
    // const newCartItems = cartItems.filter((item, i) => item._id !== id);

    // if (value === 'inc') {
    //   setCartItems([
    //     ...newCartItems,
    //     { ...foundProduct, quantity: foundProduct.quantity + 1 },
    //   ]);
    //   setTotalPrice(prevTotal => prevTotal + foundProduct.price);
    //   setItemsInCartQty(prevTotalQty => prevTotalQty + 1);
    // }
    // if (value === 'dec') {
    //   if (foundProduct.quantity > 1)
    //     setCartItems([
    //       ...newCartItems,
    //       { ...foundProduct, quantity: foundProduct.quantity - 1 },
    //     ]);
    //   setTotalPrice(prevTotal => {
    //     prevTotal - foundProduct.price;
    //   });
    //   setItemsInCartQty(prevQty => prevQty - 1);
    // }
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
        itemsInCartQty,
        qty,
        increaseQty,
        decreaseQty,
        addToCart,
        setShowCart,
        changeCartItemQty,
        removeItemFromCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
