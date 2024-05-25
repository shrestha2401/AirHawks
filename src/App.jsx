import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './assets/Navbar.jsx'
import './App.css'
import LoginSignup from './assets/LoginSignup.jsx';
import HomePage from './assets/Homepage.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
 
    return (
      <div>
        <Navbar/>
      <Router>
        <Routes>
          <Route path="/HomePage" element={<HomePage/>} />
        </Routes>
      </Router>
        <h1>AirHawks</h1>
        <LoginSignup />
      
      </div>
    );
  }

export default App; 


// export default App
