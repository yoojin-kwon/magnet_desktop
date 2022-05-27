import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';
import ThemeToggle from '../theme/themeToggle';
import Header from './header';

const AppLayout = ({ children, navigate }) => {
  const [ThemeMode, toggleTheme] = useTheme();
  return (
    <WrapContainer>
      <Header navigate={navigate} />
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
      <ContentContainer>{children}</ContentContainer>
    </WrapContainer>
  );
};

export default AppLayout;

const WrapContainer = styled.main`
  min-height: 100%;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4em;
`;
