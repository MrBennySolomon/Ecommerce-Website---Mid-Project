/* eslint-disable react-hooks/exhaustive-deps */
import ImageSlider from "./ImageSlider";
import React, {useEffect} from 'react'
import '../styles/Home.modules.css';
import UsersDataBaseAPI from '../utils/UsersDataBaseAPI';
import ProductsDataBaseAPI from '../utils/ProductsDataBaseAPI';
import CartDataBaseAPI from '../utils/CartDataBaseAPI';
import CoursesDataBaseAPI from '../utils/CoursesDataBaseAPI';

import img0 from '../img/img0.jpg';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';
import img7 from '../img/img7.jpg';
import img8 from '../img/img8.jpg';
import img9 from '../img/img9.jpg';
import img10 from '../img/img10.jpg';


const Home = ({inputRef}) => {

  const fetchData = async () => {
    UsersDataBaseAPI.getAllUsers().then((res) => {localStorage.setItem('users', JSON.stringify(res))});
    ProductsDataBaseAPI.getAllProducts().then((res) => {localStorage.setItem('products', JSON.stringify(res))});
    CartDataBaseAPI.getAllCarts().then((res) => {localStorage.setItem('carts', JSON.stringify(res))});
    CoursesDataBaseAPI.getAllCourses().then((res) => {localStorage.setItem('courses', JSON.stringify(res))});
  }

  useEffect(() => {
    fetchData();
    localStorage.setItem('cartCount', '0');
    localStorage.setItem('cartTotal', '0');
    localStorage.setItem('productsCart',JSON.stringify([]));
    localStorage.setItem('coursesCart',JSON.stringify([]));

  }, []);

  const slides = [
    { url: img0, title: "img" },
    { url: img1, title: "img" },
    { url: img2, title: "img" },
    { url: img3, title: "img" },
    { url: img4, title: "img" },
    { url: img5, title: "img" },
    { url: img6, title: "img" },
    { url: img7, title: "img" },
    { url: img8, title: "img" },
    { url: img9, title: "img" },
    { url: img10, title: "img" },
  ];
  const containerStyles = {
    width: "60%",
    height: "50vmin",
    margin: "0 auto",
  };

  return (
    <div className='home'>
      <h1>Home</h1>
      <div className='slider' style={containerStyles}><ImageSlider slides={slides} /></div>
    </div>
    )
}
export default Home;