import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './assets/login';
import Signup from './assets/signup';
import Dashboard from './assets/dashboard';
import { UserProvider } from './assets/Usercontext';
import './App.css';
import ManageFlights from './assets/manageflights';
import ThankYou from './assets/thankyoucomponent';
import ContactUs from './assets/ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './assets/landingpage.jsx';
import AdminLogin from './assets/admin/adminlogin.jsx';
import AdminPortal from './assets/admin/adminpage.jsx';
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};
const AdminProtectedRoute = ({ element: Component, ...rest }) => {
  const adminToken = localStorage.getItem('adminToken');
  return adminToken ? <Component {...rest} /> : <Navigate to="/admin-portal" />;
};

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/admin-login" element={<AdminLogin/>} />
          <Route path="/admin-portal" element={<AdminProtectedRoute element={AdminPortal} />}/> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/manage" element={<ManageFlights />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
