/* eslint-disable react-hooks/exhaustive-deps */
import '../../styles/Courses.modules.css';
import React, {useEffect, useRef} from 'react';
import Card                       from '../../components/Card';
import {Link, useNavigate}        from 'react-router-dom';
import { useGlobalContext }       from '../../context/context';
import constants                  from '../../utils/constants';

const Courses = () => {

  const {controller, arrayIds, updateArrayIds} = useGlobalContext();
  const navigate                               = useNavigate();
  const nameRef                                = useRef();
  const priceRef                               = useRef();
  const imageRef                               = useRef();
  
  const loggedInUser                           = controller.model.getLocal(constants.LOGGED_IN_USER);
  let courses                                  = controller.model.getLocal('courses');
  const isAdmin                                = (loggedInUser?.type === 'admin');

  const deleteClickHandler                     = () => {
    if (nameRef.current.value.length > 0) {
      controller.deleteCourseFromDB(arrayIds, courses, nameRef, navigate, updateArrayIds);
    }
  }

  const addClickHandler                        = () => {
    if (nameRef.current.value.length  > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      controller.addCourseFromDB(nameRef, priceRef, imageRef, navigate);
    }
  }

  const editClickHandler                       = () => {
    if (nameRef.current.value.length  > 0 && priceRef.current.value.length > 0 && imageRef.current.value.length > 0) {
      controller.editCourseFromDB(arrayIds, courses, nameRef, priceRef, imageRef, navigate);
    }
  }

  useEffect(() => {
    controller.checkDB(courses, updateArrayIds)
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