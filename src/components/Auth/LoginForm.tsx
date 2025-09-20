import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { login } from '../../common/auth';
import { COLORS } from '../../styling/constants';
import { useProfile } from '../Profile/ProfileContext';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { profileChanged } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      
      const success = await login(email, password);
      
      if (success) {
        profileChanged(email);
        if (onSuccess) onSuccess();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
        Login
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: 'white' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
          input: { color: 'white' },
        }}
      />
      
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { color: 'white' } }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
          input: { color: 'white' },
        }}
      />
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: COLORS.quiz.secondary,
          '&:hover': {
            backgroundColor: COLORS.quiz.main,
          }
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      
      <Typography sx={{ color: 'white', textAlign: 'center' }}>
        Don't have an account?{' '}
        <Button 
          onClick={onSwitch} 
          sx={{ color: COLORS.quiz.light }}
        >
          Register
        </Button>
      </Typography>
    </Box>
  );
};