import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { firebaseAuth } from '../service/firebase';
import AppLayout from './AppLayout';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const logout = (user) => {
    if (user) {
      return firebaseAuth.signOut();
    } else {
      return;
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <AppLayout logout={logout}>
      <SpeechBubble>{user?.email} 님, 반갑습니다😀</SpeechBubble>
    </AppLayout>
  );
};

export default Home;

const SpeechBubble = styled.div`
  position: relative;
  background: ${({ theme }) => theme.buttonColor};
  border-radius: 10em;
  padding: 1em 1.5em;
  font-size: 0.8em;
  font-weight: 550;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 0.625em solid transparent;
    border-top-color: ${({ theme }) => theme.buttonColor};
    border-bottom: 0;
    border-left: 0;
    margin-left: -0.312em;
    margin-bottom: -0.625em;
  }
`;
