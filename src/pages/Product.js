import React, { useState } from 'react';
import '../styles/Product.modules.css';
import { useParams, useNavigate } from 'react-router-dom';
// import CartDataBaseAPI from '../utils/CartDataBaseAPI';
// import ProductsDataBaseAPI from '../utils/ProductsDataBaseAPI';
import { useGlobalContext } from '../context/context';


const Product = () => {
  const params = useParams();
  const {updateCount, updateTotal} = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const products = JSON.parse(localStorage.getItem('products'));
  const shoppingCarts = JSON.parse(localStorage.getItem('carts'));
  const selectedProduct = products.find((item) => Number(item.id) === Number(params.id));
  localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
  let userCart = [];

  

  const addToCartHandler = () => {

    if (loggedInUser) {

      userCart = shoppingCarts.find((cart) => cart.user.email === loggedInUser.email);
      localStorage.setItem('userCart', JSON.stringify(userCart));

      setIsError(false);
      setIsLoading(true);

      if (selectedProduct.stock <= 0) {
        setIsError(true);
      }else{
        if (userCart) {
          // userCart.products.push(selectedProduct);
          // CartDataBaseAPI.editCart(userCart, userCart.id);
        
        }else{
          // userCart = {
          //   courses: [],
          //   products:[selectedProduct],
          //   user: loggedInUser
          // }
          // CartDataBaseAPI.addCart(userCart);
      }
      // const currentCart = {
      //   courses: [],
      //   products: [selectedProduct],
      //   user: loggedInUser
      // };

     
 

      const count = Number(localStorage.getItem('cartCount')) + 1;
      localStorage.setItem('cartCount', JSON.stringify(count));
      updateCount('+');

      const total = Number(localStorage.getItem('cartTotal')) + Number(selectedProduct.price);
      localStorage.setItem('cartTotal', JSON.stringify(total));
      updateTotal('+', Number(selectedProduct.price));

      // localStorage.setItem('currentCart', JSON.stringify(currentCart));
      selectedProduct.stock = selectedProduct.stock - 1;

      const productsCart = JSON.parse(localStorage.getItem('productsCart'));
      productsCart.push(selectedProduct);
      localStorage.setItem('productsCart',JSON.stringify(productsCart));

      // localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct))
      // ProductsDataBaseAPI.editProduct(selectedProduct, selectedProduct.id);
      // CartDataBaseAPI.getAllCarts().then((res) => {localStorage.setItem('carts', JSON.stringify(res))});
      // ProductsDataBaseAPI.getAllProducts().then((res) => {localStorage.setItem('products', JSON.stringify(res))});
    }
    setIsLoading(false);
    navigate('/products');
    }else{
      navigate('/login');
    }
    
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