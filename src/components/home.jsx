import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth, firebaseDatabase } from '../service/firebase';
import AppLayout from './AppLayout';
import styled from 'styled-components';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [channels, setChannels] = useState();
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

  useEffect(() => {
    firebaseDatabase
      .ref('channels') //
      .on('value', (snapshot) => {
        const value = snapshot.val();
        setChannels(Object.values(value));
      });
  }, []);

  return (
    <AppLayout logout={logout}>
      <Container>
        <SpeechBubble>{user?.email} 님, 반갑습니다😀</SpeechBubble>
        {channels?.map((channel) => (
          <ChannelList>
            <div>#{channel.channelName}</div>
            <div>{channel.channelComment}</div>
            <button>Join?</button>
            <button>Chat</button>
          </ChannelList>
        ))}
      </Container>
    </AppLayout>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpeechBubble = styled.div`
  position: relative;
  background: ${({ theme }) => theme.buttonColor};
  border-radius: 10em;
  padding: 1em 1.5em;
  font-size: 0.8em;
  font-weight: 550;
  margin-bottom: 4em;

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

const ChannelList = styled.div`
  display: flex;
`;
