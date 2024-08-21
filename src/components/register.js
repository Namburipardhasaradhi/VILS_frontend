import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Register = () => {
    // State to hold form input values
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        state: '',
        country: '',
        password: '' // Change to password
    });

    // State to handle submission status
    const [status, setStatus] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vils-backend-2.onrender.com/users/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStatus(`User registered successfully with ID: ${response.data.id}`);
            navigate('/login'); // Navigate to /login on successful registration
        } catch (error) {
            if (error.response && error.response.data) {
                setStatus(`Error: ${error.response.data.detail || 'Registration failed. Please try again.'}`);
            } else {
                setStatus('Error registering user. Please try again.');
            }
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="first_name">First Name:</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                className="form-control"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="last_name">Last Name:</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                className="form-control"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="state">State:</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="form-control"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="country">Country:</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                className="form-control"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Register</button>
                    </form>
                    {status && <p className="mt-3 alert alert-info">{status}</p>}
                    <div className="mt-3 text-center">
                        <p>Already have an account? <a href="/login" className="link-primary">Sign in</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
