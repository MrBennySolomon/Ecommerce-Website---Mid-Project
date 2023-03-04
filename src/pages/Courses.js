/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import '../styles/Courses.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../context/context';
import digitalCourse from '../img/digital-course.jpg';



const Courses = () => {

  const {arrayIds, updateArrayIds} = useGlobalContext();
  let courses = JSON.parse(localStorage.getItem('courses'));

  useEffect(() => {
    
    updateArrayIds(Object.keys(courses));
    localStorage.setItem('arrayIds', JSON.stringify(Object.keys(courses)));
  }, []);


  return (
    <div className='courses'>
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