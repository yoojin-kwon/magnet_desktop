import React, { useState, useRef } from 'react';
import AppLayout from './AppLayout';
import { firebaseAuth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await firebaseAuth
        .createUserWithEmailAndPassword(email, password) //
        .then((data) => goToSignIn(data.user.uid));
    } catch (error) {
      // console.error(error);
      if (error.code === 'auth/invalid-email') {
        alert('이메일을 정확히 입력해주세요🙂');
      } else if (error.code === 'auth/weak-password') {
        alert('비밀번호는 최소 6자 이상 설정해주세요🙂');
      } else if (error.code === 'auth/email-already-in-use') {
        alert('이미 가입한 계정입니다🙂');
      } else {
        alert(error.message);
      }
    }
    formRef.current.reset();
  };

  const goToSignIn = (userId) => {
    navigate('/signin', { state: { id: userId } });
  };

  return (
    <AppLayout>
      <form onSubmit={onSubmit} ref={formRef}>
        {/* --remove autocomplete-- */}
        <input style={{ display: 'none' }} aria-hidden='true' />
        <input type='password' style={{ display: 'none' }} aria-hidden='true' />
        {/* --remove autocomplete end-- */}
        {/* --real input-- */}
        <input
          type='email'
          placeholder='이메일'
          id='email'
          ref={emailRef}
          autoComplete='false'
          required
        />
        <input
          type='password'
          placeholder='비밀번호'
          id='password'
          ref={passwordRef}
          autoComplete='new-password'
        />
        {/* --real input end-- */}
        <button type='submit'>회원가입</button>
      </form>
    </AppLayout>
  );
};

export default SignUp;
