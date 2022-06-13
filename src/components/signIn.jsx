import React, { useRef } from 'react';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = ({ authService }) => {
  const ThemeMode = useTheme();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await authService
        .signIn(email, password)
        .then((data) => goToHome(data.user.uid));
    } catch (error) {
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
      <Container>
        <Title>
          반가워요!
          <br />
          자유로운 커뮤니케이션을 위한 마그넷입니다:)
        </Title>
        <Form onSubmit={onSubmit} ref={formRef}>
          {/* --remove autocomplete-- */}
          <input style={{ display: 'none' }} aria-hidden='true' />
          <input
            type='password'
            style={{ display: 'none' }}
            aria-hidden='true'
          />
          {/* --remove autocomplete end-- */}
          {/* --real input-- */}
          <Input
            type='email'
            placeholder='이메일'
            id='email'
            ref={emailRef}
            autoComplete='false'
            required
          />
          <Input
            type='password'
            placeholder='비밀번호'
            id='password'
            ref={passwordRef}
            autoComplete='new-password'
          />
          {/* --real input end-- */}
          <Button type='submit'>로그인</Button>
        </Form>
        <ToSignUp>
          아직 계정이 없으시다면?
          <NavLink to='/signup' theme={ThemeMode[0]}>
            회원가입
          </NavLink>
        </ToSignUp>
      </Container>
    </AppLayout>
  );
};

export default SignIn;

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
  height: 2.8em;
  padding: 0 1em;
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

const ToSignUp = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.textColor};
`;

const NavLink = styled(Link)`
  font-weight: 600;
  color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'};
  margin: 0 0.5em;
`;
