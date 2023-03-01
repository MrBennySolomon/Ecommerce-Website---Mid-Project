import React from 'react';
import '../styles/Cart.modules.css';
import cardImg from '../img/card.png'

const Cart = () => {
  return (
    <div className='cart'>
      <h1>Your Shopping Cart</h1>
      <div className='cart-container'>
        <div className='item1'>
          <img className='img-cart' src={cardImg} alt="Avatar"/>
          <div className='description'>
            <h2>title</h2>
            <h3>sub-title sub-title sub-title sub-title sub-title</h3>
          </div>
        </div>
        <div className='item2'>
          <img className='img-cart' src={cardImg} alt="Avatar"/>
          <div className='description'>
          <h2>title</h2>
            <h3>sub-title sub-title sub-title sub-title sub-title</h3>
          </div>
        </div>
        <div className='item3'>
          <img className='img-cart' src={cardImg} alt="Avatar"/>
          <div className='description'>
          <h2>title</h2>
            <h3>sub-title sub-title sub-title sub-title sub-title</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;