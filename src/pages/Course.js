/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import '../styles/Course.modules.css';
import { useParams, useNavigate } from 'react-router-dom';
// import vid from '../mp4/vid.mp4';
import { useGlobalContext } from '../context/context';

// import CartDataBaseAPI from '../utils/CartDataBaseAPI';
// import ProductsDataBaseAPI from '../utils/ProductsDataBaseAPI';

const Course = () => {
  // const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {updateCount, updateTotal} = useGlobalContext();

  const params = useParams();
  const courses = JSON.parse(localStorage.getItem('courses'));
  const selectedCourse = courses.find((item) => Number(item.id) === Number(params.id));
  localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const shoppingCarts = JSON.parse(localStorage.getItem('carts'));
  let userCart = [];

  // if (loggedInUser) {
  //   userCart = shoppingCarts.find((cart) => cart.user.email === loggedInUser.email);
  // }
  
  // if (loggedInUser.courses.find((item) => Number(item.id) === Number(selectedCourse.id))) {
  //   setIsPurchased(true);
  // }

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
    // if (userCart) {
    //   userCart.courses.push(selectedCourse);
    //   // CartDataBaseAPI.editCart(userCart, userCart.id);
      
    // }else{
      // userCart = {
      //   courses: [selectedCourse],
      //   products:[],
      //   user: loggedInUser
      // }
      // CartDataBaseAPI.addCart(userCart);
    }
    // CartDataBaseAPI.getAllCarts().then((res) => {localStorage.setItem('carts', JSON.stringify(res))});
    // ProductsDataBaseAPI.getAllProducts().then((res) => {localStorage.setItem('products', JSON.stringify(res))});
    

    // setIsLoading(false);
    
    // useEffect(() => {
    //   localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
      
    //   const count = Number(localStorage.getItem('cartCount')) + 1;
    //   localStorage.setItem('cartCount', JSON.stringify(count));
    //   updateCount();

    //   const total = Number(localStorage.getItem('cartTotal')) + Number(selectedCourse.price);
    //   localStorage.setItem('cartTotal', JSON.stringify(total));
    //   updateTotal(Number(selectedCourse.price));
      
    //   navigate('/courses');
    // }, []);
  

  // return isPurchased ? 
  // (
  //   <div className='course'>
  //     <video width="60%" height="80%" controls controlsList="nodownload">
  //       <source src={vid} type="video/mp4"/>
  //     </video>
  //     <div className='course-video-items'>
  //       <div className='video1'>video1</div>
  //       <div className='video2'>video2</div>
  //       <div className='video3'>video3</div>
  //       <div className='video4'>video4</div>
  //       <div className='video5'>video5</div>
  //       <div className='video6'>video6</div>
  //     </div>
  //   </div>
  // )
  // :



  return (
    <div className='course'>
      <div className='course-img-container'/>
      <div className='course-description-container'>
        {isLoading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        <h1>course no {params.id}</h1>
        <h2>description</h2>
        <h3>details details details details details details </h3>
        <button onClick={addToCartHandler} className='add-to-cart-btn'>Add to Cart</button>
      </div>
    </div>
  )
}

export default Course;