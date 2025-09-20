import React, { useState } from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { COLORS } from '../../styling/constants';

type AuthMode = 'login' | 'register';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ 
  open, 
  onClose, 
  initialMode = 'login' 
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleSuccess = () => {
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: COLORS.quiz.main,
          borderRadius: '8px',
          padding: '16px',
          minWidth: '350px'
        }
      }}
    >
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};