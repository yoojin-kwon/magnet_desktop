import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { firebaseDatabase, firebaseAuth } from '../service/firebase';

const ChannelList = ({ channel, joinChannel, goToChat }) => {
  const [join, setJoin] = useState(false);
  const user = firebaseAuth.currentUser.uid;
  useEffect(() => {
    firebaseDatabase
      .ref(`channels/${channel.createdAt}/members`) //
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userId = Object.values(snapshot.val());
          setJoin(userId.includes(user));
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <List>
      <div>#{channel.channelName}</div>
      <div>{channel.channelComment}</div>
      <button onClick={() => joinChannel(channel.createdAt)}>
        {join ? 'Join!' : 'Join?'}
      </button>
      <button onClick={() => goToChat(channel.createdAt)}>Chat</button>
    </List>
  );
};
export default ChannelList;

const List = styled.div`
  display: flex;
`;
