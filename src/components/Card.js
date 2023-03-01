import React from 'react'
import '../styles/Card.modules.css';
import cardImg from '../img/card.png'
const Card = () => {
  return (
    <div className="card">
      <img className='img-card' src={cardImg} alt="Avatar"/>
      <div className="container">
        <h4><b>John Doe</b></h4>
        <p>Architect & Engineer</p>
      </div>
    </div>
  )
}

export default Card;