import { Link, useNavigate } from 'react-router-dom';
import '../styles/MainNavigation.modules.css';
import { useGlobalContext } from '../context/context';
import logo from '../img/logo.jpg';
import './css/menu.css';
import './css/style.css';
import {useRef} from 'react';


const MainNavigation = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const {count} = useGlobalContext();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const logoutHandler = () => {
    localStorage.removeItem('loggedInUser');
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
                <li onClick={() => inputRef.current.checked = false}><Link to='/login'>Login</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/products'>Products</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/courses'>Courses</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/cart'>Cart</Link></li>
                <li onClick={() => inputRef.current.checked = false}><Link to='/about'>About</Link></li>
                {loggedInUser && <li onClick={logoutHandler}>Logout</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <nav className='light'> 
        <ul>
          <li><Link to='/'><img src={logo} alt='logo' className='logo'/></Link></li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/cart'>Shopping Cart<label className='amount-of-items'>{count}</label></Link></li>
          <li><Link to='/courses'>Online Courses</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/about'>About</Link></li>
          {loggedInUser && <li onClick={logoutHandler}>Logout</li>}
        </ul>
      </nav>
      
    </>
  )
}

export default MainNavigation