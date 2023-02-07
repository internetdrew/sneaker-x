import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '@/library/utils';
import { useStateContext } from '@/context/StateContext';

const Success = () => {
  const { setCartItems, setTotalPrice, setItemsInCartQty } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setItemsInCartQty(0);
    runFireworks();
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
          <BsBagCheckFill />
        </p>
        <h2>Thanks for ordering from Sneaker X</h2>
        <p className='email-msg'>Check your email inbox for your receipt!</p>
        <p className='description'>
          If you have any questions, please email
          <a href='mailto:andrew@internetdrew.com' className='email'>
            order@sneakerx.com
          </a>
        </p>
        <Link href='/'>
          <button type='button' width='300px' className='btn'>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
