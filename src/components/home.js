import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-4 mb-4">
        <strong>Welcome to Video Streaming App</strong>
      </h1>
      <div className="d-flex">
        <Link to="/login" className="btn btn-primary me-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-success">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
