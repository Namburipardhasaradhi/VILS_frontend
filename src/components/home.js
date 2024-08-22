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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f0e4;
  padding: 0 5%;
  animation: ${fadeIn} 1.5s ease-in;
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const HomeTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: ${fadeIn} 2s ease-in;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const HomeSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #4e4e4e;
  animation: ${fadeIn} 2.5s ease-in;
`;

const HomeButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  .btn {
    padding: 12px 30px;
    font-size: 1.2rem;
    border-radius: 50px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <ContentWrapper>
        <HomeTitle>Welcome to Video Streaming App</HomeTitle>
        <HomeSubtitle>Connect and stream with ease</HomeSubtitle>
        <HomeButtons>
          <Link to="/login" className="btn btn-primary ">
            Login
          </Link>
          <Link to="/register" className="btn btn-success">
            Register
          </Link>
        </HomeButtons>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;