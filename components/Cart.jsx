import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';

import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/library/client';
import getStripe from '@/library/getStripe';

const Cart = () => {
  const cartRef = useRef(null);
  const {
    totalPrice,
    itemsInCartQty,
    cartItems,
    setShowCart,
    changeCartItemQty,
    removeItemFromCart,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) return;

    const data = await response.json();
    console.log(data);

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({itemsInCartQty} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your cart is empty...</h3>
            <button
              type='button'
              onClick={() => setShowCart(false)}
              className='btn'
            >
              Continue Shopping
            </button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className='product-container'>
            {cartItems.map(item => (
              <div className='product' key={item?._id}>
                <img
                  src={urlFor(item?.images[0])}
                  alt=''
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span
                          className='minus'
                          onClick={() =>
                            changeCartItemQty(item?._id, 'decrease')
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>{item?.quantity}</span>
                        <span
                          className='plus'
                          onClick={() =>
                            changeCartItemQty(item?._id, 'increase')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className='remove-item'
                      onClick={() => removeItemFromCart(item?._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type='button' className='btn' onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
