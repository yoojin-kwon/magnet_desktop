import React from 'react';
import styled from 'styled-components';

const ChannelList = ({ channel, joinChannel, goToChat }) => {
  return (
    <List>
      <div>#{channel.channelName}</div>
      <div>{channel.channelComment}</div>
      <button onClick={() => joinChannel(channel.createdAt)}>join</button>
      <button onClick={() => goToChat(channel.createdAt)}>Chat</button>
    </List>
  );
};
export default ChannelList;

const List = styled.div`
  display: flex;
`;
