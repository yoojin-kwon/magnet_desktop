import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import ChannelRepository from './service/channelRepository';
import ChatRepository from './service/chatRepository';
import AuthService from './service/authService';

const root = ReactDOM.createRoot(document.getElementById('root'));
const channelRepository = new ChannelRepository();
const chatRepository = new ChatRepository();
const authService = new AuthService();

root.render(
  <React.StrictMode>
    <App
      authService={authService}
      chatRepository={chatRepository}
      channelRepository={channelRepository}
    />
  </React.StrictMode>
);
