import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firebaseAuth } from '../service/firebase';
import AppLayout from './AppLayout';

const Home = () => {
  const navigateState = useLocation().state;
  const user = firebaseAuth.currentUser.email;

  return (
    <AppLayout>
      <div>Home</div>
      <div>{user}님 반갑습니다:)</div>
    </AppLayout>
  );
};

export default Home;
