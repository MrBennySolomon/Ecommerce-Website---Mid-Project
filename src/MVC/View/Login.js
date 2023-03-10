import                           "../../styles/Login.modules.css";
import React, { useRef }    from "react";
import { useNavigate }      from "react-router-dom";
import { useGlobalContext } from "../../context/context";

const Login = () => {
  const { controller, 
          isError, 
          setIsError } = useGlobalContext();

  const navigate       = useNavigate();
  const emailRef       = useRef();
  const passwordRef    = useRef();

  const submitHandler  = (e) => {
    controller.loginSubmit(e, emailRef, passwordRef, setIsError, navigate);
  };

  const resetHandler   = (e) => {
    controller.resetLogin(e, emailRef, passwordRef, setIsError);
  };

  return (
    <div className="login">
      <h1>Login Form</h1>
      <div className="form-container">
        <form>
          <input ref={emailRef} type="email" placeholder="Email" required />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
          <button onClick={submitHandler}>login</button>
          <button onClick={resetHandler}>reset</button>
          {isError && (
            <h3 className="error-login">oops... wrong email or password</h3>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
