import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseAuth, firebaseDatabase } from '../service/firebase';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { BsPersonCircle } from 'react-icons/bs';

const Chat = memo(({ logout, authService, chatRepository }) => {
  const channelId = useParams();
  const user = authService.currentUser();
  const [chatList, setChatList] = useState();
  const [memberList, setMemberList] = useState();
  const messageRef = useRef();
  const formRef = useRef();
  const scrollRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const id = channelId.channelId;
    if (messageRef.current.value === '') {
      alert('메시지를 입력해주세요🙂');
    } else {
      const message = {
        createdAt: Date.now(),
        message: messageRef.current.value,
        userId: user.uid,
        userName: user.email.split('@')[0],
      };
      chatRepository.sendChat(id, message);
      formRef.current.reset();
    }
  };

  useEffect(() => {
    const id = channelId.channelId;
    chatRepository.showChat(id, 'chat', setChatList);
    chatRepository.showChat(id, 'members', setMemberList);
    // return () => ref.off();
  }, []);

  const scrollToBottom = useCallback(() => {
    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
  });

  useEffect(() => {
    scrollToBottom();
  }, [chatList]);

  const convertTime = (unixTime) => {
    const time = new Date(unixTime);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hour = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    if (hour > 12) {
      return `${year}.${month}.${date} 오후 ${hour - 12}:${minutes}`;
    } else if (hour === 12) {
      return `${year}.${month}.${date} 오후 ${hour}:${minutes}`;
    } else {
      return `${year}.${month}.${date} 오전 ${hour}:${minutes}`;
    }
  };

  return (
    <AppLayout navigate='Chat' logout={logout}>
      <Container>
        <Profile>
          {memberList?.map((member) => (
            <Member>
              <BsPersonCircle size={25} />
              <MemberName>{member.userName}</MemberName>
            </Member>
          ))}
        </Profile>
        <List ref={scrollRef}>
          {chatList?.map((chat) => (
            <Message key={chat.createdAt}>
              <User>@{chat.userName}</User>
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

const Profile = styled.div`
  width: 90%;
  height: 4em;
  display: flex;
  padding-bottom: 1em;
`;

const Member = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5em;
`;

const MemberName = styled.span`
  font-size: 0.8em;
  font-weight: 600;
  margin-top: 0.5em;
`;

const List = styled.div`
  width: 90%;
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
  /* max-width: 20em; */
  font-size: 0.8em;
  padding: 0 1.2em 0 0.7em;
  color: ${({ theme }) => theme.textColor};
`;

const Time = styled.span`
  font-size: 0.5rem;
  font-weight: 550;
  color: ${({ theme }) => theme.subTextColor};
  white-space: nowrap;
`;

const Form = styled.form`
  display: flex;
  padding-top: 1em;
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
