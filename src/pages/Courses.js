import React from 'react';
import '../styles/Courses.modules.css';
import Card from '../components/Card';
import {Link} from 'react-router-dom';

const Courses = () => {
  return (
    <div className='courses'>
      <h1>Online Courses</h1>
      <div className='courses-container'>
        <Link to='/courses/1'><Card title='course 1' description='nails tutorial' price='456 NIS'/></Link>
        <Link to='/courses/2'><Card title='course 2' description='nails beginners' price='556 NIS'/></Link>
        <Link to='/courses/3'><Card title='course 3' description='nails guid' price='756 NIS'/></Link>
        <Link to='/courses/4'><Card title='course 4' description='nails art tutorial' price='1456 NIS'/></Link>
        <Link to='/courses/5'><Card title='course 5' description='nails info' price='256 NIS'/></Link>
      </div>
    </div>
  )
}

export default Courses;