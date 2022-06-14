import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	body{
    background: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textcolor};
    box-sizing: border-box;
    @media only screen and (max-width: 500px){
      
    }
    
    
    a {
      text-decoration: none;
    }
  }
  `;
