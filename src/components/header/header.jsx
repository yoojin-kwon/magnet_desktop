import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/themeProvider';

const Header = ({ navigate }) => {
  const ThemeMode = useTheme();

  return (
    <Container theme={ThemeMode[0]}>
      <Logo>Magnet</Logo>
      <Navigate>Home / Chat</Navigate>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7em 2em;
  font-weight: 800;
`;

const Logo = styled.span``;

const Navigate = styled.span``;
