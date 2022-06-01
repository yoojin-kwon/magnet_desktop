import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../context/themeProvider';

const Header = ({ navigate, logout }) => {
  const ThemeMode = useTheme();

  return (
    <Container>
      <Logo theme={ThemeMode[0]}>MAGNET</Logo>
      {logout && (
        <>
          <Navigate theme={ThemeMode[0]}>
            <NavLink to='/home' theme={ThemeMode[0]}>
              Home
            </NavLink>
            {'  '}/{'  '}
            <NavLink to='/channel' theme={ThemeMode[0]}>
              Channel
            </NavLink>
            {'  '}/{'  '}
            <Logout onClick={logout}>Logout</Logout>
          </Navigate>
        </>
      )}
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

const Logout = styled.button`
  /* color: ${(props) =>
    props.theme === 'light' ? 'rgb(34, 34, 34)' : 'rgb(247, 247, 247)'}; */
  background-color: transparent;
  border: transparent;
  font-size: 1em;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;
