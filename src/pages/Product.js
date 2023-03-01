import React, { useState } from 'react';
import '../styles/Product.modules.css';
import { useParams, useNavigate } from 'react-router-dom';
import ProductsDataBaseAPI from '../utils/ProductsDataBaseAPI';
import CartDataBaseAPI from '../utils/CartDataBaseAPI';

const Product = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const products = [];
  const shoppingCarts = [];


  const addToCartHandler = () => {
    setIsError(false);
    setIsLoading(true);
    ProductsDataBaseAPI.getAllProducts()
    .then((res) => {
      localStorage.setItem('products', JSON.stringify(res));
      setIsLoading(false);
      products.push(...res);
      const selectedProduct = products.find((product) => product.id === params.id);
      
      if (selectedProduct && selectedProduct.stock > 0) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        
        setIsError(false);
        setIsLoading(true);
        CartDataBaseAPI.getAllCarts()
        .then((res) => {
          localStorage.setItem('shoppingCarts', JSON.stringify(res));
          setIsLoading(false);
          shoppingCarts.push(...res);
          const loggedInUser = localStorage.getItem('loggedInUser');
          let userCart = shoppingCarts.find((cart) => cart.user.email === loggedInUser.email);

          if (userCart) {
            userCart.products.push(JSON.parse(localStorage.getItem('selectedProduct')));
          }else{
            userCart = {
              courses: [],
              products:[selectedProduct],
              user: loggedInUser
            }
          }
          navigate('/products');
        })
        .catch((err) => {
          console.error('error get all products');
          setIsLoading(false);
        })
      }
      })
      .catch((err) => {
        console.error('error product out of stock');
        setIsLoading(false);
      })
    }

  return (
    <div className='product'>
      <div className='product-img-container'/>
      <div className='product-description-container'>
      {isLoading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        <h1>title</h1>
        <h2>description</h2>
        <h3>details details details details details details </h3>
        <button onClick={addToCartHandler} className='add-to-cart-btn'>Add to Cart</button>
        {isError && <h3 className='error-msg'>sorry ... this product is out of stock</h3>}
      </div>
    </div>
  )
}

export default Product;