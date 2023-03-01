import React from 'react';
import '../styles/Course.modules.css';
// import { useParams } from 'react-router-dom';
import vid from '../mp4/vid.mp4'

const Course = () => {
  // const params = useParams();

  return (
    <div className='course'>
      <video width="60%" height="80%" controls controlsList="nodownload">
        <source src={vid} type="video/mp4"/>
      </video>
      <div className='course-video-items'>
        <div className='video1'>video1</div>
        <div className='video2'>video2</div>
        <div className='video3'>video3</div>
        <div className='video4'>video4</div>
        <div className='video5'>video5</div>
        <div className='video6'>video6</div>
      </div>
    </div>
  )
}

export default Course;