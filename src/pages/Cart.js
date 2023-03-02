import React, {useEffect} from 'react';
import '../styles/Cart.modules.css';
// import cardImg from '../img/card.png'
import { useNavigate,Link } from 'react-router-dom';
// import { useGlobalContext } from '../context/context';
import Card from '../components/Card';

const Cart = () => {
  const navigate = useNavigate();
  // const {arrayIds, updateArrayIds} = useGlobalContext();


  const productsCart = JSON.parse(localStorage.getItem('productsCart'));
  const coursesCart = JSON.parse(localStorage.getItem('coursesCart'));


  useEffect(() => {
    
    //updateArrayIds(Object.keys(productsCart));
    
  }, []);

  useEffect(() => {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className='cart'>
      <h1>Your Shopping Cart</h1>
      <div className='cart-container'>
        <table>
          <thead></thead>
          <tbody>
      {productsCart && productsCart.map((item) => <tr><td><img src='https://i.etsystatic.com/25672645/r/il/249845/2769996240/il_1140xN.2769996240_n6j2.jpg' width='50px' height='50px'/></td><td>{item?.name} </td><td>{item?.price} NIS</td></tr>)}
      {coursesCart && coursesCart.map((item) => <tr><td><img src='https://i.etsystatic.com/25672645/r/il/249845/2769996240/il_1140xN.2769996240_n6j2.jpg' width='50px' height='50px'/></td><td>{item?.name} </td><td>{item?.price} NIS</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cart;