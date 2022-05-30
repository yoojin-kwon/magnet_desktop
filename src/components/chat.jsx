import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { firebaseAuth, firebaseDatabase } from '../service/firebase';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';

const Chat = memo(({ chatRepository }) => {
  const user = firebaseAuth.currentUser;
  const logout = () => {
    firebaseAuth.signOut();
  };
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
    return () => ref.off();
  }, []);

  const scrollToBottom = useCallback(() => {
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  });

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const convertTime = (unixTime) => {
    const date = new Date(unixTime);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (hour > 12) {
      return `오후 ${hour - 12}:${minutes}`;
    } else if (hour === 12) {
      return `오후 ${hour}:${minutes}`;
    } else {
      return `오전 ${hour}:${minutes}`;
    }
  };

  return (
    <AppLayout navigate='Chat' logout={logout}>
      <Container>
        <List ref={scrollRef}>
          {chatList?.map((chat) => (
            <Message key={chat.createdAt}>
              <User>👩 유진</User>
              <Text>{chat.message}</Text>
              <Time>{convertTime(chat.createdAt)}</Time>
            </Message>
          ))}
        </List>
        <Form ref={formRef} onSubmit={onSubmit}>
          <Input
            type='text'
            name='message'
            ref={messageRef}
            placeholder='메시지 남기기'
            maxLength={120}
          />
          <Button type='submit'>
            <FiSend size='24' />
          </Button>
        </Form>
      </Container>
    </AppLayout>
  );
});

export default Chat;

const Container = styled.div`
  width: 30em;
  height: 32em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  height: 35em;
  padding: 1em 2em;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  margin: 1.2em 0;
`;

const User = styled.span`
  display: inline-block;
  font-size: 0.8em;
  font-weight: 800;
  color: ${({ theme }) => theme.textColor};
`;

const Text = styled.span`
  display: inline-block;
  max-width: 24em;
  font-size: 0.8em;
  font-weight: 550;
  padding: 0 1.2em 0 0.7em;
  color: ${({ theme }) => theme.textColor};
`;

const Time = styled.span`
  font-size: 0.5rem;
  font-weight: 550;
  color: ${({ theme }) => theme.subTextColor};
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  background-color: magnetGrey3;
  border: none;
  width: 28em;
  height: 2.8em;
  padding: 0 1em;
  border-radius: 0.5em;
  cursor: pointer;

  &::placeholder {
    font-size: 0.9em;
    font-weight: 550;
  }
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
`;
