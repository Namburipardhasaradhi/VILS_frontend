import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Contact from './components/contact';
import Room from './components/meet/room';
import RoomLogin from './components/meet/roomlogin';

const PrivateRoute = ({ children }) => {
    const userId = sessionStorage.getItem('userId');
    return userId ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/room/:roomID" element={<PrivateRoute><Room /></PrivateRoute>} />
        <Route path="/roomlogin" element={<RoomLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
