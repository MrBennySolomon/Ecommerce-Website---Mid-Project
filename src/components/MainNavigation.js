import                            '../styles/menu.css';
import                            '../styles/style.css';
import                            '../styles/MainNavigation.modules.css';

import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext }  from '../context/context';

import {useRef}              from 'react';
import constants             from '../utils/constants';

import logo                  from '../img/logo.jpg';


const MainNavigation        = () => {
  const navigate            = useNavigate();
  const inputRef            = useRef();
  const {count, controller} = useGlobalContext();
  const loggedInUser        = controller.model.getLocal(constants.LOGGED_IN_USER);

  const logoutHandler = () => {
    controller.model.removeLocal(constants.LOGGED_IN_USER);
    inputRef.current.checked = false;
    navigate('/');
  }

  return (
    <>
      <div className="menu-wrap">
        <input ref={inputRef} type="checkbox" className="toggler"/>
        <div className="hamburger">
          <div></div>
        </div>
        <Link to='/'><img src={logo} alt='logo' className='logo'/></Link>
        <div className="menu">
          <div>
            <div>
              <ul className='flex-container'>
                <li onClick={() => inputRef.current.checked = false}><Link to='/'>Home</Link></li>
                {!loggedInUser && <li onClick={() => inputRef.current.checked = false}><Link to='/login'>Login</Link></li>}
                <li onClick={() => inputRef.current.checked = false}><Link to='/products'>Products</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/courses'>Courses</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/cart'>Cart<label className='amount-of-items-mobile'>{count}</label></Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/about'>About</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/live'>Go Live</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/coupons'>Coupons</Link></li>
                
                {loggedInUser && <li className='logout-btn-size' onClick={logoutHandler}>Logout</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className='fullscreen-navbar'> 
        <ul>
          <li><Link to='/'><img src={logo} alt='logo' className='logo'/></Link></li>
          <li><Link to='/'>Home</Link></li>
          {!loggedInUser && <li><Link to='/login'>Login</Link></li>}
          <li><Link to='/cart'>Shopping Cart<label className='amount-of-items'>{count}</label></Link></li>
          <li><Link to='/courses'>Online Courses</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/live'>Go Live</Link></li>
          <li><Link to='/coupons'>Coupons</Link></li>
          {loggedInUser && <li className='logout-btn-size' onClick={logoutHandler}>Logout</li>}
        </ul>
      </nav>
      
    </>
  )
}

export default MainNavigation