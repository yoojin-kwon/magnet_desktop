import React, { useRef } from 'react';
import { firebaseDatabase } from '../service/firebase';
import AppLayout from './AppLayout';

const Channel = () => {
  const nameRef = useRef();
  const commentRef = useRef();
  const formRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const channel = {
      createdAt: Date.now(),
      channelName: nameRef.current.value,
      channelComment: commentRef.current.value,
    };
    firebaseDatabase
      .ref(`channels/${channel.createdAt}`)
      .set(channel) //
      .then(formRef.current.reset());
  };

  return (
    <AppLayout>
      <form ref={formRef} onSubmit={onSubmit}>
        <input ref={nameRef} type='text' placeholder='이름' />
        <input ref={commentRef} type='text' placeholder='코멘트' />
        <button type='submit'>등록</button>
      </form>
    </AppLayout>
  );
};

export default Channel;
