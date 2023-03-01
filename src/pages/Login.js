/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import '../styles/Login.modules.css';
import UsersDataBaseAPI from '../utils/UsersDataBaseAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const emailRef    = useRef();
  const passwordRef = useRef();
  const users = [];
  let email;
  let password;

  const submitHandler = (e) => {
    e.preventDefault();
    email    = emailRef.current.value;
    password = passwordRef.current.value;
    setIsError(false);
    setIsLoading(true);
    UsersDataBaseAPI.getAllUsers()
    .then((res) => {
      localStorage.setItem('users', JSON.stringify(res));
      setIsLoading(false);
      users.push(...res);
      const result = users.find((user) => user.email === email && user.password === password);
      if (result) {
        localStorage.setItem('loggedInUser', JSON.stringify(result));
        navigate('/');
      }else{
        setIsError(true)
      }
    })
    .catch((err) => {
      console.error('error get all users');
      setIsLoading(false);
    })
  }

  const resetHandler = (e) => {
    e.preventDefault();
    emailRef.current.value    = '';
    passwordRef.current.value = '';
    setIsError(false);
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
          {isError && <h3 className='error-login'>oops... wrong email or password</h3>}
        </form>
      </div>
    </div>
  )
}

export default Login;