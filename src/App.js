import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {


  return (

      <Router>
      <Navbar/>
      <Routes>
        
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      </Routes>
      </Router>


  )
}

export default App