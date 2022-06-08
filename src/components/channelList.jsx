import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firebaseDatabase, firebaseAuth } from '../service/firebase';

const ChannelList = ({ channel, joinChannel, goToChat }) => {
  const [join, setJoin] = useState(false);
  const user = firebaseAuth.currentUser.uid;
  useEffect(() => {
    firebaseDatabase
      .ref(`channels/${channel.createdAt}/members`) //
      .on('value', (snapshot) => {
        const userId = Object.values(snapshot.val()).map((el) => el.userId);
        setJoin(userId.includes(user));
      });
  }, []);

  return (
    <List>
      <div>
        <Name># {channel.channelName}</Name>
        <Comment>{channel.channelComment}</Comment>
      </div>
      <div>
        <Button type='join' onClick={() => joinChannel(channel.createdAt)}>
          {join ? 'Join! 🥳' : 'Join? 🤔'}
        </Button>
        <Button type='chat' onClick={() => goToChat(channel.createdAt, join)}>
          Chat 💬
        </Button>
      </div>
    </List>
  );
};
export default ChannelList;

const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 22em;
  margin-bottom: 1.2em;
`;

const Name = styled.div`
  font-weight: 600;
  margin-bottom: 0.4em;
`;

const Comment = styled.div`
  font-size: 0.8em;
  width: 10em;
`;

const Button = styled.button`
  width: 5.5em;
  height: 3em;
  border-radius: 10em;
  margin-left: 0.5em;
  cursor: pointer;
  border: transparent;
  background-color: ${(props) =>
    props.type === 'join' ? 'rgb(224, 155, 155)' : 'rgb(150, 186, 224)'};

  &:hover {
    opacity: 0.7;
  }
`;
