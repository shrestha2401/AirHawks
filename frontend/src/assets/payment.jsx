import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext.jsx';

const LoginSignup = () => {
    const navigate = useNavigate();
    const { username, setUsername, email, setEmail, password, setPassword } = useContext(UserContext);
    const [action, setAction] = useState("Sign-Up");
  
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
          localStorage.setItem('token', response.data.token); // Save token to localStorage
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
    }
};