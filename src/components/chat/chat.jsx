import React, { useEffect, useRef, useState } from 'react';
import { firebaseDatabase } from '../../service/firebase';
import styles from './chat.module.css';
import { FiSend } from 'react-icons/fi';

const Chat = ({ chatRepository }) => {
  const [chatList, setChatList] = useState();
  const messageRef = useRef();
  const formRef = useRef();
  const scrollRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    if (messageRef.current.value === '') {
      alert('메시지를 입력해주세요🙂');
    } else {
      const message = {
        createdAt: Date.now(),
        message: messageRef.current.value,
      };
      chatRepository.sendChat(message);
      formRef.current.reset();
    }
  };

  useEffect(() => {
    const ref = firebaseDatabase.ref('user1/messages');
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      setChatList(Object.values(value));
    });
  }, [chatList]);

  const convertTime = (unixTime) => {
    const date = new Date(unixTime);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (hour >= 12) {
      return `오후 ${hour}:${minutes}`;
    } else {
      return `오전 ${hour}:${minutes}`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.list} ref={scrollRef}>
        {chatList?.map((chat) => (
          <div className={styles.chat} key={chat.createdAt}>
            <span className={styles.message}>{chat.message}</span>
            <span className={styles.time}>{convertTime(chat.createdAt)}</span>
          </div>
        ))}
      </div>
      <form className={styles.form} ref={formRef} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type='text'
          name='message'
          ref={messageRef}
          placeholder='메시지 보내기...'
          maxLength={120}
        />
        <button className={styles.button} type='submit'>
          <FiSend size='24' />
        </button>
      </form>
    </div>
  );
};

export default Chat;
