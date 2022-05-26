import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import ChatRepository from './service/chatRepository';

const root = ReactDOM.createRoot(document.getElementById('root'));
const chatRepository = new ChatRepository();

root.render(
  <React.StrictMode>
    <App chatRepository={chatRepository} />
  </React.StrictMode>
);
