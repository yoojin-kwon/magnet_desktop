import React, { useRef } from 'react';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import { firebaseDatabase, firebaseAuth } from '../service/firebase';

const Channel = () => {
  const nameRef = useRef();
  const commentRef = useRef();
  const formRef = useRef();

  const logout = (user) => {
    if (user) {
      return firebaseAuth.signOut();
    } else {
      return;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const channel = {
      createdAt: Date.now(),
      channelName: nameRef.current.value,
      channelComment: commentRef.current.value,
      members: 0,
      chat: 0,
    };
    firebaseDatabase
      .ref(`channels/${channel.createdAt}`)
      .set(channel) //
      .then(formRef.current.reset());
  };

  return (
    <AppLayout logout={logout}>
      <Container>
        <Title>
          마그넷과 함께
          <br />
          커뮤니케이션 채널을 만들어보세요:)
        </Title>
        <Form ref={formRef} onSubmit={onSubmit}>
          <Input ref={nameRef} type='text' placeholder='이름' />
          <Input
            as='textarea'
            textarea
            resize
            ref={commentRef}
            type='text'
            placeholder='코멘트'
          />
          <Button type='submit'>등록</Button>
        </Form>
      </Container>
    </AppLayout>
  );
};

export default Channel;

const Container = styled.div`
  width: 30em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  background: linear-gradient(to right top, #c6c937, #3c68b9);
  color: transparent;
  -webkit-background-clip: text;
  margin-bottom: 4em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: none;
  width: 20em;
  height: ${(props) => (props.textarea ? '6em' : '2.8em')};
  ${(props) =>
    props.textarea &&
    `resize: none;
    padding-top: 1em;`}
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0.5em;
  margin-bottom: 0.8em;
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
  border: none;
  height: 2.8em;
  padding: 0 1em;
  border-radius: 0.5em;
  margin-bottom: 4em;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 550;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.buttonColor};
`;
