import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import ChannelList from './channelList';

const Home = ({ logout, authService, channelRepository }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [channels, setChannels] = useState();
  useEffect(() => {
    authService.authChange((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });

    channelRepository.getChannelList(setChannels);
  }, [authService, navigate, channelRepository]);

  const joinChannel = (channelId) => {
    const memberInfo = {
      userId: user.uid,
      userName: user.email.split('@')[0],
    };

    channelRepository
      .getChannelMember(channelId) //
      .then((snapshot) => {
        const data = Object.values(snapshot.val());
        let array = [];
        for (let i = 0; i < data.length; i++) {
          array.push(data[i].userId);
        }
        if (array.includes(user.uid)) {
          alert('이미 가입하신 채널입니다🙂');
        } else {
          channelRepository.joinChannel(channelId, memberInfo);
        }
      });
  };

  const goToChat = (channelId, join) => {
    if (join === false) {
      alert('채팅방에서 대화를 나누고 싶다면 채널에 가입해주세요🙂');
    } else {
      navigate(`/chat/${channelId}`);
    }
  };

  return (
    <AppLayout logout={logout}>
      <Container>
        <SpeechBubble>{user?.email} 님, 반갑습니다😀</SpeechBubble>
        {channels?.map((channel) => (
          <ChannelList
            key={channel.createdAt}
            channel={channel}
            joinChannel={joinChannel}
            goToChat={goToChat}
            channelRepository={channelRepository}
            authService={authService}
          />
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
  color: ${({ theme }) => theme.textColor};

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
