import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../common/supabase';
import { getCurrentUserProfile, setCurrentUserProfile } from '../../common/profileUtils';
import { createUserProfile } from '../../common/profileUtils';
import { UserProfile } from '../../common/types';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getInitialSession() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(data.session);
        setUser(data.session?.user || null);
        
        if (data.session?.user) {
          // Ensure the user has a local profile
          const userProfile = getCurrentUserProfile();
          
          if (!userProfile || userProfile.id !== data.session.user.id) {
            const newProfile: UserProfile = {
              id: data.session.user.id,
              username: data.session.user.user_metadata.username || 
                       data.session.user.email?.split('@')[0] || 
                       data.session.user.id,
              createdAt: data.session.user.created_at || new Date().toISOString(),
            };
            
            createUserProfile(newProfile);
          }
        } else {
          // If no session, ensure guest profile is active
          setCurrentUserProfile('Guest');
        }
      } catch (e) {
        const err = e as Error;
        setError(err.message);
        console.error('Error getting session:', err);
        
        // Ensure guest profile is active on error
        setCurrentUserProfile('Guest');
      } finally {
        setLoading(false);
      }
    }
    
    getInitialSession();
    
    // Listen for auth changes
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        const userProfile: UserProfile = {
          id: session.user.id,
          username: session.user.user_metadata.username || 
                   session.user.email?.split('@')[0] || 
                   session.user.id,
          createdAt: session.user.created_at || new Date().toISOString(),
        };
        
        createUserProfile(userProfile);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUserProfile('Guest');
      }
    });
    
    // Cleanup subscription
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  
  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        user, 
        loading, 
        error,
        isAuthenticated: !!session 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);