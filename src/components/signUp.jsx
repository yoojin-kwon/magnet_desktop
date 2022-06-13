import React, { useRef } from 'react';
import AppLayout from './AppLayout';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ({ authService }) => {
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
        .signUp(email, password) //
        .then(goToSignIn());
    } catch (error) {
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

  const goToSignIn = () => {
    navigate('/');
  };

  return (
    <AppLayout>
      <Container>
        <Title>
          안녕하세요!
          <br />
          마그넷에서 자유로운 커뮤니케이션을 즐겨보세요:)
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
          <Button type='submit'>회원가입</Button>
        </Form>
        <ToSignIn>
          이미 계정이 있으시다면?
          <NavLink to='/' theme={ThemeMode[0]}>
            로그인
          </NavLink>
        </ToSignIn>
      </Container>
    </AppLayout>
  );
};

export default SignUp;

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

const ToSignIn = styled.div`
  font-size: 0.9em;
  color: ${({ theme }) => theme.textColor};
`;

const NavLink = styled(Link)`
  font-weight: 600;
  color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'};
  margin: 0 0.5em;
`;
