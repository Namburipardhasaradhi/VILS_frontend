import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('https://vils-backend-2.onrender.com/users/', {
        params: {
          email: email,
          password: password,
        },
      });

      if (response.status === 200) {
        const userId = response.data.id;
        const email = response.data.email;
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('email', email);
        navigate('/contact');
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
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.welcomeText}>
          <h1>You are Part of <span style={styles.highlight}>Our Family</span>,<br />Enter Your World</h1>
        </div>
      </div>
      <div style={styles.rightSection}>
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email address"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.loginButton}>
              Login
            </button>
          </form>
          <div style={styles.signupLink}>
            <p>Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link></p>
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
    backgroundColor: '#4e00c2',
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
  loginBox: {
    width: '300px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '30px',
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
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4e00c2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  signupLink: {
    marginTop: '15px',
  },
  link: {
    color: '#4e00c2',
    textDecoration: 'none',
  },
};

export default Login;
