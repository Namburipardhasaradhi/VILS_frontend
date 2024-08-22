import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import Contact from './components/contact';
import Room from './components/meet/room';
import RoomLogin from './components/meet/roomlogin';
import PrivateRoute from './protectedroute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/roomlogin" element={<PrivateRoute><RoomLogin /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
