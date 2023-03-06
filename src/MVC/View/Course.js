/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import vid from '../../mp4/vid.mp4';
import vid2 from '../../mp4/vid2.mp4';
import vid3 from '../../mp4/vid3.mp4';
import '../../styles/Course.modules.css';
import React, {useRef}            from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext }       from '../../context/context';
import constants                  from '../../utils/constants';

const Course = () => {
  const {controller, updateCount, updateTotal} = useGlobalContext();
  const videoRef                               = useRef();
  const params                                 = useParams();
  const navigate                               = useNavigate();

  const courses                                = controller.model.getLocal('courses');
  const selectedCourse                         = courses[params.id];
  
  const loggedInUser                           = controller.model.getLocal(constants.LOGGED_IN_USER);
  const isPurchased                            = loggedInUser?.courses?.length > 0 && loggedInUser?.courses?.find((course) => course.name === selectedCourse.name);

  const addToCartHandler                       = () => {
      controller.addCourseToCart(updateCount, updateTotal, params, loggedInUser, navigate);
  }

  return isPurchased ? 
  (
    <div className='course'>
      <video ref={videoRef} width="60%" height="80%" controls controlsList="nodownload">
        <source src={vid} type="video/mp4"/>
      </video>

      <div className='course-video-items'>
        {/* {loggedInUser.courses[0].videos.map ((vid) => {
          return <button key={vid.name} onClick={() => videoRef.current.src = vid.url}>{vid.name}</button>
        })}         */}
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
        <h1>{selectedCourse.name}</h1>
        <h2>{selectedCourse.price}</h2>
        <button onClick={addToCartHandler} className='add-to-cart-btn'>Add to Cart</button>
      </div>
    </div>
  )
}

export default Course;