import React, { useEffect, useRef, useState } from 'react';
import { firebaseDatabase } from '../../service/firebase';

const Chat = ({ chatRepository }) => {
  const [chatList, setChatList] = useState();
  const messageRef = useRef();
  const formRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const message = {
      createdAt: Date.now(),
      message: messageRef.current.value || '',
    };
    chatRepository.sendChat(message);
    formRef.current.reset();
  };

  useEffect(() => {
    const ref = firebaseDatabase.ref('user1/messages');
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      setChatList(Object.values(value));
    });
  }, []);

  return (
    <>
      <div>
        {chatList.map((chat) => (
          <div>
            <span key={chat.createdAt}>{chat.message}</span>
            <span> {chat.createdAt}</span>
          </div>
        ))}
      </div>
      <form ref={formRef} onSubmit={onSubmit}>
        <input
          type='text'
          name='message'
          ref={messageRef}
          placeholder='메시지 보내기...'
          maxLength={120}
        />
        <button type='submit'>전송</button>
      </form>
    </>
  );
};

export default Chat;
