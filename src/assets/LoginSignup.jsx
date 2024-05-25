import React, { useState } from 'react';
import axios from 'axios';

import './LoginSignup.css'; 
import user_icon from './person.png';
import email_icon from './email.png';
import password_icon from './password.png';

const LoginSignup = ()=>{
   const [action,setAction] = useState("Sign-Up");
   return (
    <div className='container'>
      <div className="header">
        <div className="text">
          {action}
        </div>
        <div className="underline">

        </div>
        <div className="inputs">
          {action==="Login"?<div></div>:<div className="input">
            <img src={user_icon} alt=""></img>
            <input placeholder='Username' type="text"/>
          </div>}
          <div className="input">
            <img src={email_icon} alt=""></img>
            <input placeholder='E-mail' type="email"/>
          </div>
          <div className="input">
            <img src={password_icon} alt=""></img>
            <input placeholder='Password' type="password"/>
          </div>
        </div>
      <div className="submitcontainer">
        <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{
          setAction("Sign Up")
        }}>Sign Up</div>
        <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{
          setAction("Login")
        }}>Login</div>
      </div>
      </div>
    </div>
   )
} 

export default LoginSignup;
