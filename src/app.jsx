import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/chat';
import Home from './components/home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Channel from './components/channel';
import styled from 'styled-components';
import { ThemeProvider } from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';

const App = ({ authService, channelRepository, chatRepository }) => {
  const logout = (user) => {
    if (user) {
      return authService.logout();
    } else {
      return;
    }
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleSize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, [windowSize]);

  if (windowSize === 500) {
    return (
      <Router>
        <ThemeProvider>
          <GlobalStyle />
          <Routes>
            <Route
              exact
              path='/'
              element={<SignIn authService={authService} />}
            />
            <Route
              path='signup'
              element={<SignUp authService={authService} />}
            />
            <Route
              path='home'
              element={
                <Home
                  logout={logout}
                  authService={authService}
                  channelRepository={channelRepository}
                />
              }
            />
            <Route
              path='chat/:channelId'
              element={
                <Chat
                  logout={logout}
                  authService={authService}
                  chatRepository={chatRepository}
                />
              }
            />
            <Route
              path='channel'
              element={
                <Channel
                  logout={logout}
                  channelRepository={channelRepository}
                />
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    );
  } else {
    return <Main>스크린 사이즈를 줄여주세요🙂</Main>;
  }
};

export default App;

const Main = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
`;
