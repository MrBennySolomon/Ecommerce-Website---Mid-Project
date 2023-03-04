/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import '../styles/Cart.modules.css';
import { useNavigate } from 'react-router-dom';
import digitalCourse from '../img/digital-course.jpg';
import { useGlobalContext } from '../context/context';


const Cart = () => {
  const {total, updateCount, updateTotal} = useGlobalContext();
  const navigate = useNavigate();

  const productsCart = JSON.parse(localStorage.getItem('productsCart'));
  const coursesCart = JSON.parse(localStorage.getItem('coursesCart'));

  const plusClickHandler = (e) => {
    const productsCart = JSON.parse(localStorage.getItem('productsCart'));
    const coursesCart = JSON.parse(localStorage.getItem('coursesCart'));

    const selectedProduct = productsCart.find((item) => item.name === e.target.getAttribute('name'))
    const selectedCourse = coursesCart.find((item) => item.name === e.target.getAttribute('name'))
    const count = Number(localStorage.getItem('cartCount')) + 1;
    localStorage.setItem('cartCount', JSON.stringify(count));
    updateCount('+');

    const total = Number(localStorage.getItem('cartTotal')) + (selectedCourse ? Number(selectedCourse.price) : Number(selectedProduct.price));
    localStorage.setItem('cartTotal', JSON.stringify(total));
    updateTotal('+', selectedCourse ? Number(selectedCourse.price) : Number(selectedProduct.price));

    if (selectedProduct) {
      selectedProduct.stock = selectedProduct.stock - 1;
      productsCart.push(selectedProduct);
      localStorage.setItem('productsCart',JSON.stringify(productsCart));
    }else{
      coursesCart.push(selectedCourse);
      localStorage.setItem('coursesCart',JSON.stringify(coursesCart));
    }
  }

  const minusClickHandler = (e) => {
    const productsCart = JSON.parse(localStorage.getItem('productsCart'));
    const coursesCart = JSON.parse(localStorage.getItem('coursesCart'));

    const selectedProduct = productsCart.find((item) => item.name === e.target.getAttribute('name'))
    const selectedCourse = coursesCart.find((item) => item.name === e.target.getAttribute('name'))
    const count = Number(localStorage.getItem('cartCount')) - 1;
    localStorage.setItem('cartCount', JSON.stringify(count));
    updateCount('-');

    const total = Number(localStorage.getItem('cartTotal')) - (selectedCourse ? Number(selectedCourse.price) : Number(selectedProduct.price));
    localStorage.setItem('cartTotal', JSON.stringify(total));
    updateTotal('-', selectedCourse ? Number(selectedCourse.price) : Number(selectedProduct.price));

    if (selectedProduct) {
      selectedProduct.stock = selectedProduct.stock + 1;
    }

    
    if (selectedCourse) {
      let flag = true;
      const newArr = [];
      for (let i = 0; i < coursesCart.length; i++) {
        if (flag && (coursesCart[i].name === selectedCourse.name)) {
          flag = false;
        }else{
          newArr.push(coursesCart[i]);
        }
      }
      localStorage.setItem('coursesCart',JSON.stringify(newArr));
    }

    if (selectedProduct) {
      let flag = true;
      const newArr = [];
      for (let i = 0; i < productsCart.length; i++) {
        if (flag && (productsCart[i].name === selectedProduct.name)) {
          flag = false;
        }else{
          newArr.push(productsCart[i]);
        }
      }
      localStorage.setItem('productsCart',JSON.stringify(newArr));
    }
  }

  useEffect(() => {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='cart'>
      <h1>Your Shopping Cart</h1>
      <h2 className='total'>{`total: ${total} NIS`}</h2>
      <div className='cart-container'>
        <table>
          <thead></thead>
          <tbody>
            {productsCart?.map((item) => <tr key={(new Date().getMilliseconds()) + Math.random()}><td><img alt='img' src='https://i.etsystatic.com/25672645/r/il/249845/2769996240/il_1140xN.2769996240_n6j2.jpg' className='img-cart'/></td><td>{item?.name} </td><td>{item?.price} NIS</td><td><button name={item.name} onClick={minusClickHandler} className='btnMinus'>-</button></td><td className='itemAmount'>{item.count}</td><td><button name={item.name} onClick={plusClickHandler} className='btnPlus'>+</button></td></tr>)}
            {coursesCart?.map((item) => <tr key={(new Date().getMilliseconds()) + Math.random()}><td><img alt='img' src={digitalCourse} className='img-cart'/></td><td>{item?.name} </td><td>{item?.price} NIS</td><td><button  name={item.name} onClick={minusClickHandler} className='btnMinus'>-</button></td><td className='itemAmount'>{item.count}</td><td><button name={item.name} onClick={plusClickHandler} className='btnPlus'>+</button></td></tr>)}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default Cart;