import React from 'react'
import '../styles/Card.modules.css';
// import cardImg from '../img/card.png'
const Card = ({title, description, price, src}) => {
  return (
    <div className="card">
      <img className='img-card' src={src} alt="Avatar"/>
      <div className="container">
        <h4 className='title'><b>{title}</b></h4>
        <p>{description}</p>
        <p className='price'>{price}</p>
      </div>
    </div>
  )
}

export default Card;