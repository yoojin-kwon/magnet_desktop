import React from 'react';
import Chat from './components/chat/chat';
import styles from './app.module.css';

const App = ({ chatRepository }) => {
  return (
    <div className={styles.app}>
      <Chat chatRepository={chatRepository} />
    </div>
  );
};

export default App;
