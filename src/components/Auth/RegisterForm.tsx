import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { register } from '../../common/auth';
import { COLORS } from '../../styling/constants';
import { useProfile } from '../Profile/ProfileContext';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { profileChanged } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      if (!email || !password || !confirmPassword || !username) {
        setError('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      const success = await register(email, password, username);
      
      if (success) {
        profileChanged(username);
        if (onSuccess) onSuccess();
      } else {
        setError('Registration failed. This email might already be in use.');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '400px' }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'white' }}>
        Register
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
      
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? 'Registering...' : 'Register'}
      </Button>
      
      <Typography sx={{ color: 'white', textAlign: 'center' }}>
        Already have an account?{' '}
        <Button 
          onClick={onSwitch} 
          sx={{ color: COLORS.quiz.light }}
        >
          Login
        </Button>
      </Typography>
    </Box>
  );
};