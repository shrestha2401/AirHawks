import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './assets/LoginSignup';
import Dashboard from './assets/dashboard';
import { UserProvider } from './assets/Usercontext';
import './App.css';
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </UserProvider>
    </Router>
  );
};


export default App;