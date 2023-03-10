import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '@/context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, itemsInCartQty } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Sneakers X</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping size={35} />
        <span className='cart-item-qty'>{itemsInCartQty}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
