import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { firebaseAuth } from '../service/firebase';
import AppLayout from './AppLayout';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const logout = () => {
    firebaseAuth.signOut();
    console.log('로그아웃');
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <AppLayout logout={logout}>
      <div>Home</div>
      <div>{user}님 반갑습니다:)</div>
    </AppLayout>
  );
};

export default Home;
