/* eslint-disable jsx-a11y/alt-text */
import '../../styles/Product.modules.css';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';

const Product = () => {

  const params = useParams();
  const {controller, updateCount, updateTotal} = useGlobalContext();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const products         = controller.model.getLocal('products');
  const selectedProduct  = products[params.id];

  const addToCartHandler = () => {
    controller.addProductToCart(selectedProduct, setIsError, updateCount, updateTotal, navigate);
  }

  return (
    <div className='product'>
      <div className='product-img-container'><img src={selectedProduct.imgUrl} width='100%' height='100%'/></div>
      <div className='product-description-container'>
        <h1>{selectedProduct.name}</h1>
        <h2>{selectedProduct.price}</h2>
        <button onClick={addToCartHandler} className='add-to-cart-btn'>Add to Cart</button>
        {isError && <h3 className='error-msg'>sorry ... this product is out of stock</h3>}
      </div>
    </div>
  )
}

export default Product;