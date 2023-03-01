import React from 'react';
import '../styles/Courses.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';

const Courses = () => {
  return (
    <div className='courses'>
      <h1>Online Courses</h1>
      <div className='courses-container'>
        <Link to='/courses/1'><Card/></Link>
        <Link to='/courses/2'><Card/></Link>
        <Link to='/courses/3'><Card/></Link>
        <Link to='/courses/4'><Card/></Link>
        <Link to='/courses/5'><Card/></Link>
      </div>
    </div>
  )
}

export default Courses;