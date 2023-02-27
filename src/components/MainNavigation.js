import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/MainNavigation.modules.css';
import { useGlobalContext } from '../context/context';


const MainNavigation = () => {
  const {isDarkMode, setDark} = useGlobalContext(false);

  return (

      <nav className={isDarkMode ? 'dark' : 'light'}>
        <ul>
          <li><Link className={isDarkMode ? 'link-dark' : 'link-light'} to='/'><img src='../img/logo.jpg' alt='logo' className='logo'/></Link></li>
          <li><Link className={isDarkMode ? 'link-dark' : 'link-light'} to='/'>Home</Link></li>
          <li><Link className={isDarkMode ? 'link-dark' : 'link-light'} to='/about'>About</Link></li>
        </ul>
        <button onClick={() => setDark(!isDarkMode)} className={isDarkMode ? 'btn-dark' : 'btn-light'}>{isDarkMode ? 'Make Day' : 'Make Night'}</button>
      </nav>
  )
}

export default MainNavigation