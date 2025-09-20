import { supabase } from './supabase';
import { UserProfile } from './types';
import { createUserProfile, setCurrentUserProfile } from './profileUtils';

// Sign in with email and password
export async function login(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Create or update local profile based on Supabase user
    if (data.user) {
      const userProfile: UserProfile = {
        id: data.user.id,
        username: data.user.email?.split('@')[0] || data.user.id,
        createdAt: data.user.created_at || new Date().toISOString(),
      };
      
      createUserProfile(userProfile);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
}

// Sign up with email and password
export async function register(email: string, password: string, username: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
    
    if (error) throw error;
    
    // Create local profile
    if (data.user) {
      const userProfile: UserProfile = {
        id: data.user.id,
        username: username || data.user.email?.split('@')[0] || data.user.id,
        createdAt: data.user.created_at || new Date().toISOString(),
      };
      
      createUserProfile(userProfile);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error registering:', error);
    return false;
  }
}

// Sign out
export async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Set guest profile as current
    setCurrentUserProfile('Guest');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
}

// Get current session
export async function getCurrentSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Reset password
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}

// Update password
export async function updatePassword(password: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating password:', error);
    return false;
  }
}