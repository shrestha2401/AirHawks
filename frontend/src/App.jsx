import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginSignup from './assets/LoginSignup';
import Dashboard from './assets/dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
