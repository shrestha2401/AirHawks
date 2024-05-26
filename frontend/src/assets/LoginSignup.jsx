import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css'; 
import user_icon from './person.png';
import email_icon from './email.png';
import password_icon from './password.png';
import { useNavigate } from 'react-router-dom';



const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Sign-Up");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAction = async (actionType) => {
    try {
      let response;
      if (actionType === "Sign-Up") {
        response = await axios.post('http://localhost:3000/Signup', {
          name: username,
          email: email,
          password: password
        });
      } else if (actionType === "Login") {
        response = await axios.post('http://localhost:3000/Login', {
          email: email,
          password: password
        });
      }
      alert(response.data.message); 
      if (response.data.message === "Success" || response.data.message === "Login successful") {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">
          Welcome to AirHawks 
        </div>
        <div className="underline"></div>
        <div className="inputs">
          {action === "Login" ? null : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input placeholder='Username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input placeholder='E-mail' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="submitcontainer">
          <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => handleAction("Sign-Up")}>Sign Up</div>
          <div className={action === "Sign-Up" ? "submit gray" : "submit"} onClick={() => handleAction("Login")}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
