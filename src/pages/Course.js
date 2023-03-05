/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef} from 'react';
import '../styles/Course.modules.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import dubai from '../mp4/dubai2.mp4';
import vid from '../mp4/vid.mp4';
import vid2 from '../mp4/vid2.mp4';
import vid3 from '../mp4/vid3.mp4';

const Course = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {updateCount, updateTotal} = useGlobalContext();
  const videoRef = useRef();

  const params = useParams();
  const courses = JSON.parse(localStorage.getItem('courses'));
  const selectedCourse = courses[params.id];  localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const shoppingCarts = JSON.parse(localStorage.getItem('carts'));
  let userCart = [];
  const isPurchased = loggedInUser?.courses?.length > 0 && loggedInUser?.courses?.find((course) => course.name === selectedCourse.name);

  const addToCartHandler = () => {
    setIsLoading(true);
    
    if (loggedInUser) {

      userCart = shoppingCarts.find((cart) => cart.user.email === loggedInUser.email);
      localStorage.setItem('userCart', JSON.stringify(userCart));
  
      setIsLoading(true);

      // const currentCart = {
      //   courses: [selectedCourse],
      //   products: [],
      //   user: loggedInUser
      // };
      
     

      const count = Number(localStorage.getItem('cartCount')) + 1;
      localStorage.setItem('cartCount', JSON.stringify(count));
      updateCount('+');
  
      const total = Number(localStorage.getItem('cartTotal')) + Number(selectedCourse.price);
      localStorage.setItem('cartTotal', JSON.stringify(total));
      updateTotal('+', Number(selectedCourse.price));
  
      // localStorage.setItem('currentCart', JSON.stringify(currentCart));
      selectedCourse.stock = selectedCourse.stock - 1;
      // localStorage.setItem('selectedProduct', JSON.stringify(selectedCourse))
      // ProductsDataBaseAPI.editProduct(selectedProduct, selectedProduct.id);
      // CartDataBaseAPI.getAllCarts().then((res) => {localStorage.setItem('carts', JSON.stringify(res))});
      // ProductsDataBaseAPI.getAllProducts().then((res) => {localStorage.setItem('products', JSON.stringify(res))});
      const coursesCart = JSON.parse(localStorage.getItem('coursesCart'));
      coursesCart.push(selectedCourse);
      localStorage.setItem('coursesCart',JSON.stringify(coursesCart));

      setIsLoading(false);
      navigate('/courses');
    }else{
      navigate('/login');
    }
  }

  return isPurchased ? 
  (
    <div className='course'>
      <video ref={videoRef} width="60%" height="80%" controls controlsList="nodownload">
        <source src={dubai} type="video/mp4"/>
      </video>

      <div className='course-video-items'>
        {/* {loggedInUser.courses[0].videos.map ((vid) => {
          return <button key={vid.name} onClick={() => videoRef.current.src = vid.url}>{vid.name}</button>
        })}         */}
        <button onClick={() => videoRef.current.src = dubai}>dubai</button>
        <button onClick={() => videoRef.current.src = vid}>nails art 1</button>
        <button onClick={() => videoRef.current.src = vid2}>nails art 2</button>
        <button onClick={() => videoRef.current.src = vid3}>nails art 3</button>
      </div>
    </div>
  )
  : 
  (
    <div className='course'>
      <div className='course-img-container'><img src={selectedCourse.imgUrl} width='100%' height='100%'/></div>
      <div className='course-description-container'>
        {isLoading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        <h1>{selectedCourse.name}</h1>
        <h2>{selectedCourse.price}</h2>
        <button onClick={addToCartHandler} className='add-to-cart-btn'>Add to Cart</button>
      </div>
    </div>
  )
}

export default Course;