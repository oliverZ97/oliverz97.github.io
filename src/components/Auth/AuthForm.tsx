import React, { useState } from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { COLORS } from '../../styling/constants';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  initialMode?: AuthMode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    console.log("success")
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>
      {mode === 'login' ? (
        <LoginForm onSuccess={handleSuccess} onSwitch={toggleMode} />
      ) : (
        <RegisterForm onSuccess={handleSuccess} onSwitch={toggleMode} />
      )}
    </Box>
  );
};