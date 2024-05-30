import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Usercontext.jsx';
import { v4 as uuidv4 } from 'uuid';

const handlePay = () => {
    const navigate = useNavigate();
    const { username, setUsername, email, setEmail, password, setPassword } = useContext(UserContext);
    const [action, setAction] = useState("Pay-Now");
  
    const handlePayment = async (actionType) => {
      try {
        let response;
        if (actionType === "Pay-Now") {
          response = await axios.post('http://localhost:3000/order', {
                amount :  1000, 
                currency : "INR",
                receipt : uuidv4(),    
          });
        } 
      } catch (error) {
        if (error.response && error.response.data) {
          alert("Some issue");
        } else {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      }
    }
};