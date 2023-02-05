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

const Cart = () => {
  const cartRef = useRef(null);
  const { totalPrice, totalQuantities, cartItems, setShowCart } =
    useStateContext();

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
          <span className='cart-num-items'>({totalQuantities} items)</span>
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

        {cartItems.length >= 1 && (
          <div className='product-container'>
            {cartItems.map(item => (
              <div className='product' key={item._id}>
                <img
                  src={urlFor(item?.images[0])}
                  alt=''
                  className='cart-product-image'
                />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span className='minus' onClick=''>
                          <AiOutlineMinus />
                        </span>
                        <span className='num'>0</span>
                        <span className='plus' onClick=''>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button className='remove-item' onClick=''>
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
                <button type='button' className='btn' onClick={''}>
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
