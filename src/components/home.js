import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HomeContainer = styled.div`
  height: 100vh;
  padding: 0 5%;
  display: flex;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  animation: ${fadeIn} 1.5s ease-in;
`;

const HomeLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HomeTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 4rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #007bff; /* Change color on hover */
  }
`;

const HomeButtons = styled.div`
  display: flex;
  gap: 20px;

  .btn {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px); /* Add lift effect */
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15); /* Add shadow */
    }
  }
`;

const HomeRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HomeLeft>
        <HomeTitle>
          <strong>Welcome to Video Streaming App</strong>
        </HomeTitle>
        <HomeButtons>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-success">
            Register
          </Link>
        </HomeButtons>
      </HomeLeft>
      <HomeRight>
        {/* Add any additional elements here if needed */}
      </HomeRight>
    </HomeContainer>
  );
};

export default Home;
