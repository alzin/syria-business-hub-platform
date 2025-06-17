
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, GeolocationData, ExpertiseType } from '@/types';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useUserProfile } from '@/hooks/useUserProfile';
import { loginUser, registerUser, logoutUser } from '@/utils/authUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  geolocation: GeolocationData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, expertise: ExpertiseType, location: string) => Promise<void>;
  logout: () => void;
  signOut: () => void; // Add signOut as an alias
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const geolocation = useGeolocation();
  const { user, fetchUserProfile, clearUser } = useUserProfile();

  useEffect(() => {
    let isMounted = true;

    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (!isMounted) return;

      setSession(session);
      
      if (session?.user) {
        // Defer profile fetching to avoid blocking the auth state change
        setTimeout(() => {
          if (isMounted) {
            fetchUserProfile(session.user);
          }
        }, 0);
      } else {
        clearUser();
      }
      
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, clearUser]);

  const handleLogin = async (email: string, password: string) => {
    await loginUser(email, password);
  };

  const handleRegister = async (
    email: string, 
    password: string, 
    name: string, 
    expertise: ExpertiseType, 
    location: string
  ) => {
    await registerUser(email, password, name, expertise, location);
  };

  const handleLogout = async () => {
    // Clear local state first to provide immediate feedback
    clearUser();
    setSession(null);
    
    // Then attempt server logout
    await logoutUser();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      geolocation,
      isLoading,
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      signOut: handleLogout, // Add signOut as an alias
    }}>
      {children}
    </AuthContext.Provider>
  );
};
