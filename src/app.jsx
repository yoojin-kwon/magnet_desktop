import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './components/chat';
import Home from './components/home';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import { ThemeProvider } from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';

const App = ({ chatRepository }) => {
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/home' element={<Home />} />
          <Route
            path='/chat'
            element={<Chat chatRepository={chatRepository} />}
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
