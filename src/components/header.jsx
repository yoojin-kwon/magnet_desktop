import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';

const Header = ({ navigate }) => {
  const ThemeMode = useTheme();

  return (
    <Container>
      <Logo theme={ThemeMode[0]}>MAGNET</Logo>
      <Navigate theme={ThemeMode[0]}>
        <NavLink to='/' theme={ThemeMode[0]}>
          Home
        </NavLink>
        {'  '}/{'  '}
        <NavLink to='/chat' theme={ThemeMode[0]}>
          Chat
        </NavLink>
      </Navigate>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1.5em;
  font-weight: 800;
`;

const Logo = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 1.5em;
  font-weight: 600;
  font-style: italic;
  letter-spacing: 5px;
  color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'};
`;

const Navigate = styled.span`
  color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'};
`;

const NavLink = styled(Link)`
  color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'};
  margin: 0 0.5em;
`;
