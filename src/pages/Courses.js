/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import '../styles/Courses.modules.css';
import Card from '../components/Card';
import {Link, useNavigate} from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import CoursesDataBaseAPI from '../utils/CoursesDataBaseAPI';

const Courses = () => {

  const {arrayIds, updateArrayIds} = useGlobalContext();
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  let courses = JSON.parse(localStorage.getItem('courses'));

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin = (loggedInUser?.type === 'admin');

  const deleteClickHandler = () => {
    if (nameRef.current.value.length > 0) {
      let id = 0;
      for (let i = 0; i < arrayIds.length; i++) {
        if (courses[arrayIds[i]].name === nameRef.current.value) {
          id = arrayIds[i];
        }
      }
      console.log('id =',id)
      CoursesDataBaseAPI.removeCourse(id);
      navigate('/');
    }
  }

  const addClickHandler = () => {
    if(nameRef.current.value.length > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      CoursesDataBaseAPI.addCourse({
        name: nameRef.current.value,
        price: priceRef.current.value,
        imgUrl: imageRef.current.value,
      });
      navigate('/');
    }
  }

  const editClickHandler = () => {
    if(nameRef.current.value.length > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      let id = 0;
      arrayIds.forEach(element => {
        if (courses[element].name === nameRef.current.value) {
          id = element;
        }
      });
      
      CoursesDataBaseAPI.editCourse({
        name: nameRef.current.value,
        price: priceRef.current.value,
        imgUrl: imageRef.current.value,
      }, id);
      navigate('/');
    }
  }

  useEffect(() => {
    const keys = Object.keys(courses);
    const newKeys = []
    for (let i = 0; i < keys.length; i++) {
      if (courses[keys[i]] !== null) {
        newKeys.push(keys[i]);
      }
    }
    updateArrayIds(newKeys);
    localStorage.setItem('arrayIds', JSON.stringify(newKeys));
  }, []);


  return (
    <div className='courses'>
     {isAdmin && <h1>Admin Area</h1>}
      {isAdmin && <div className='admin-container'><input ref={nameRef} type='text' width='100%' placeholder='Product Name'/><input ref={priceRef} type='text' width='100%' placeholder='Product Price'/><input ref={imageRef} type='text' width='100%' placeholder='Product Image Url'/><button onClick={deleteClickHandler} className='btn-delete-admin'>DELETE</button><button onClick={addClickHandler} className='btn-add-admin'>ADD</button><button onClick={editClickHandler} className='btn-edit-admin'>EDIT</button></div>}
      <h1>Online Courses</h1>
      <div className='courses-container'>
      {courses && arrayIds.map((id) => <Link key={id} to={`/courses/${id}`}><Card 
          name={courses[id]?.name} 
          price={courses[id]?.price}
          src={courses[id]?.imgUrl}
          /></Link>)}
      </div>
    </div>
  )
}

export default Courses;