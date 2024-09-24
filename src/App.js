import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './page/Home';
import Header from './components/Header';
import Signup from './components/Signup';
import './resource/css/main.min.css';


function App() {
  return (
    <Router>
      <div className='wrap'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
