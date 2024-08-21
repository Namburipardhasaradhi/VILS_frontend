// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/users/', {
        params: {
          email: email,
          password: password,
        },
      });

      if (response.status === 200) {
        const userId = response.data.id; // Extract the user ID from the response
        const email = response.data.email;
        sessionStorage.setItem('userId', userId); // Save the userId in sessionStorage
        sessionStorage.setItem('email',email);
        navigate('/contact'); // Redirect to the contact page
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
