import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        state: '',
        country: '',
        password: ''
    });

    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vils-backend-2.onrender.com/users/', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setStatus(`User registered successfully with ID: ${response.data.id}`);
            navigate('/login');
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
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <div style={styles.welcomeText}>
                    <h1>Join <span style={styles.highlight}>Our Community</span>,<br />Create Your Account</h1>
                </div>
            </div>
            <div style={styles.rightSection}>
                <div style={styles.registerBox}>
                    <h2 style={styles.title}>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                style={styles.input}
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                style={styles.input}
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                style={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="State"
                                name="state"
                                style={styles.input}
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder="Country"
                                name="country"
                                style={styles.input}
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                style={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {status && <div style={styles.status}>{status}</div>}
                        <button type="submit" style={styles.registerButton}>
                            Register
                        </button>
                    </form>
                    <div style={styles.loginLink}>
                        <p>Already have an account? <Link to="/login" style={styles.link}>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        background: 'linear-gradient(to right, #4e00c2, #7400d6)',
    },
    leftSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: '50px',
        borderBottomLeftRadius: '50px',
    },
    welcomeText: {
        textAlign: 'center',
        padding: '20px',
    },
    highlight: {
        color: '#4e00c2',
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopRightRadius: '50px',
        borderBottomRightRadius: '50px',
    },
    registerBox: {
        width: '350px', 
        maxHeight: '70%', 
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        overflowY: 'auto',
    },
    title: {
        fontSize: '28px',
        marginBottom: '20px',
        color: '#4e00c2',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    status: {
        color: 'red',
        marginBottom: '10px',
    },
    registerButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4e00c2',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    loginLink: {
        marginTop: '15px',
    },
    link: {
        color: '#4e00c2',
        textDecoration: 'none',
    },
};

export default Register;
