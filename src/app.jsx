import React from 'react';
import Chat from './components/chat/chat';

const App = ({ chatRepository }) => {
  return <Chat chatRepository={chatRepository} />;
};

export default App;
