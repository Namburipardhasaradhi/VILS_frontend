import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const HomeContainer = styled.div`
  height: 100vh;
  padding: 0 5%;
  display: flex;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
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
`;

const HomeButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const HomeRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomeImage = styled.img`
  max-width: 100%;
  height: auto;
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
        <HomeImage 
          src="C:\Users\MS COMPUTER\Pictures\Screenshots\Screenshot 2024-08-22 141221.png" 
          alt="Video Streaming" 
        />
      </HomeRight>
    </HomeContainer>
  );
};

export default Home;
