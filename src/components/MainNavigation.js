import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MainNavigation.modules.css';
import { useGlobalContext } from '../context/context';
import logo from '../img/logo.jpg';


const MainNavigation = () => {

  return (

      <nav className='light'>
        <ul>
          <li><Link to='/'><img src={logo} alt='logo' className='logo'/></Link></li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/cart'>Shopping Cart</Link></li>
          <li><Link to='/courses'>Online Courses</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </nav>
  )
}

export default MainNavigation