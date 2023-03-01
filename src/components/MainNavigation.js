import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MainNavigation.modules.css';
// import { useGlobalContext } from '../context/context';
import logo from '../img/logo.jpg';
import noLoggedInIcon from '../img/no-logged-in-icon.png';
import loggedInIcon from '../img/logged-in-icon.png';


const MainNavigation = ({cartItemsCount}) => {

  return (

      <nav className='light'>
        <ul>
          <li><Link to='/'><img src={logo} alt='logo' className='logo'/></Link></li>
          <li><Link to='/'><img alt='logged-in-img' src={true ? loggedInIcon : noLoggedInIcon} className={true ? 'logged-in-img' : 'no-logged-in-img'}/></Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/cart'>Shopping Cart<label className='amount-of-items'>{cartItemsCount}</label></Link></li>
          <li><Link to='/courses'>Online Courses</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </nav>
  )
}

export default MainNavigation