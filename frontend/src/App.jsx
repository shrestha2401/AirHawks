import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './assets/LoginSignup';
import Dashboard from './assets/dashboard';
import { UserProvider } from './assets/Usercontext';
import './App.css';
import ManageFlights from './assets/manageflights.jsx';
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};
import ThankYou from './assets/thankyoucomponent.jsx';
import ContactUs from './assets/ContactUs.jsx';
// import Navbar from './assets/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    
    <Router>
      <ToastContainer />
      <UserProvider>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/manage" element={<ManageFlights />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      </UserProvider>
    </Router>
    
  );
};


export default App;