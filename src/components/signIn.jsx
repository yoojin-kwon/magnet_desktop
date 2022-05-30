import React, { useRef } from 'react';
import AppLayout from './AppLayout';
import { firebaseAuth } from '../service/firebase';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
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
        .signInWithEmailAndPassword(email, password) //
        .then((data) => goToHome(data.user.uid));
    } catch (error) {
      // console.error(error);
      if (error.code === 'auth/wrong-password') {
        alert('비밀번호를 다시 입력해주세요😢');
      } else if (error.code === 'auth/user-not-found') {
        alert('해당 계정을 찾을 수 없습니다😢');
      } else {
        alert(error.message);
      }
    }
    formRef.current.reset();
  };

  const goToHome = (uid) => {
    navigate('/home', { state: { id: uid } });
  };

  return (
    <AppLayout>
      <div>sign in</div>
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
        <button type='submit'>로그인</button>
      </form>
      <div>아직 계정이 없다면?</div>
      <Link to='/signup'>회원가입</Link>
    </AppLayout>
  );
};

export default SignIn;
