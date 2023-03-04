/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import '../styles/Courses.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import digitalCourse from '../img/digital-course.jpg';



const Courses = () => {

  const {arrayIds, updateArrayIds} = useGlobalContext();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  let courses = JSON.parse(localStorage.getItem('courses'));

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin = (loggedInUser.type === 'admin');

  useEffect(() => {
    
    updateArrayIds(Object.keys(courses));
    localStorage.setItem('arrayIds', JSON.stringify(Object.keys(courses)));
  }, []);


  return (
    <div className='courses'>
      {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && <div className='admin-container'><input ref={nameRef} type='text' width='100%' placeholder='Product Name'/><input ref={priceRef} type='text' width='100%' placeholder='Product Price'/><input ref={imageRef} type='text' width='100%' placeholder='Product Image Url'/><button className='btn-delete-admin'>DELETE</button><button className='btn-add-admin'>ADD</button><button className='btn-edit-admin'>EDIT</button></div>}
      <h1>Online Courses</h1>
      <div className='courses-container'>
      {courses && arrayIds.map((id) => <Link key={id} to={`/courses/${id}`}><Card 
          title={courses[id]?.name} 
          description={'this course is for beginners'}
          price={courses[id]?.price}
          src={digitalCourse}
          /></Link>)}
      </div>
    </div>
  )
}

export default Courses;