import            '../styles/Card.modules.css';
import React from 'react'

const Card = ({name, price, src}) => {
  return (
    <div className="card">
      <img className='img-card' src={src} alt="Avatar"/>
      <div className="container">
        <h4 className='title'><b>{name}</b></h4>
        <p className='price'>{price}</p>
      </div>
    </div>
  )
}

export default Card;