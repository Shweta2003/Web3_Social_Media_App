import React from 'react';
import LoginPage from '../components/Login/LoginPage';

const Login = ({ onLogin }) => {
  return (
    <LoginPage onLogin={onLogin} />
  );
};

export default Login;
