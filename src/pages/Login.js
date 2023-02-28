/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import '../styles/Login.modules.css';
import UsersDataBaseAPI from '../utils/UsersDataBaseAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef    = useRef();
  const passwordRef = useRef();
  const users = [];
  let email;
  let password;

  useEffect(() => {
    setIsLoading(true);
    UsersDataBaseAPI.getAllUsers()
    .then((res) => {
      localStorage.setItem('users', JSON.stringify(res));setIsLoading(false);
      users.push(...res);
      const result = users.find((user) => user.email === email && user.password === password);
      if (result) {
        navigate('/');
      }
    })
    .catch((err) => {console.error('error get all users');setIsLoading(true);})
  }, []);
  

  const submitHandler = (e) => {
    e.preventDefault();
    email    = emailRef.current.value;
    password = passwordRef.current.value;

    console.log('email', email);
    console.log('password', password);

  }
  const resetHandler = (e) => {
    e.preventDefault();
    emailRef.current.value    = '';
    passwordRef.current.value = '';
  }

  return (
    <div className='login'>
      <h1>Login Form</h1>
      <div className='form-container'>
        {isLoading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}

        <form>
          <input ref={emailRef} type='email' placeholder='Email'/>
          <input ref={passwordRef} type='password' placeholder='Password'/>
          <button onClick={submitHandler}>login</button>
          <button onClick={resetHandler}>reset</button>
        </form>
      </div>
    </div>
  )
}

export default Login;