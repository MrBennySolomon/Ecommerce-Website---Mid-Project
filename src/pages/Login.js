import React from 'react';
import '../styles/Login.modules.css';


const Login = () => {
  return (
    <div className='login'>
      <h1>Login Form</h1>
      <div className='form-container'>
        <form>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button>login</button>
          <button>reset</button>
        </form>
      </div>
    </div>
  )
}

export default Login;