
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, ExpertiseType } from '@/types';
import { useUserProfile } from '@/hooks/useUserProfile';
import { loginUser, registerUser, logoutUser } from '@/utils/authUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string, 
    password: string, 
    name: string, 
    expertise: ExpertiseType, 
    location: string, 
    phoneNumber?: string, 
    phoneCountryCode?: string,
    specialization?: string,
    industrySector?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, fetchUserProfile, clearUser } = useUserProfile();

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'session exists' : 'no session');
        setSession(session);
        
        if (session?.user) {
          // Defer the profile fetch to avoid blocking the auth state change
          setTimeout(() => {
            fetchUserProfile(session.user);
          }, 0);
        } else {
          clearUser();
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile, clearUser]);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    expertise: ExpertiseType, 
    location: string, 
    phoneNumber?: string, 
    phoneCountryCode?: string,
    specialization?: string,
    industrySector?: string
  ) => {
    await registerUser(email, password, name, expertise, location, phoneNumber, phoneCountryCode, specialization, industrySector);
  };

  const logout = async () => {
    clearUser();
    await logoutUser();
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
