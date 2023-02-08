import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';

import { TiDeleteOutline } from 'react-icons/ti';
import { handleCheckout } from '@/library/utils';

import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/library/client';

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
                <button
                  type='button'
                  className='btn'
                  onClick={() => handleCheckout(cartItems)}
                >
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
