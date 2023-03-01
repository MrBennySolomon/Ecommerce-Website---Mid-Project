import React from 'react';
import '../styles/Product.modules.css';
import { useParams } from 'react-router-dom';


const Product = () => {
  const params = useParams();

  return (
    <div className='product'>
      <div className='product-img-container'/>
      <div className='product-description-container'>
        <h1>title</h1>
        <h2>description</h2>
        <h3>details details details details details details </h3>
      </div>
    </div>
  )
}

export default Product;