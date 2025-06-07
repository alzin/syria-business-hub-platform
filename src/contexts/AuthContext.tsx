
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, GeolocationData, ExpertiseType } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  geolocation: GeolocationData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, expertise: ExpertiseType, location: 'syria' | 'international') => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setUser(null);
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

    // Detect geolocation only once on mount
    detectGeolocation();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Fetching profile for user:', supabaseUser.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (profile) {
        const userProfile: User = {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          expertise: profile.expertise as ExpertiseType,
          location: profile.location as 'syria' | 'international',
          accessLevel: profile.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
          avatar: profile.avatar,
          verified: profile.verified,
          joinedAt: new Date(profile.created_at),
        };
        setUser(userProfile);
        console.log('Profile loaded successfully:', userProfile.name);
      } else {
        console.warn('No profile found for user:', supabaseUser.id);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const detectGeolocation = async () => {
    // Only detect geolocation once and cache the result
    if (geolocation) return;

    try {
      console.log('Detecting geolocation...');
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const geoData: GeolocationData = {
        country: data.country_name,
        countryCode: data.country_code,
        inSyria: data.country_code === 'SY'
      };
      setGeolocation(geoData);
      console.log('Geolocation detected:', geoData);
    } catch (error) {
      console.error('Failed to detect geolocation:', error);
      setGeolocation({
        country: 'Unknown',
        countryCode: 'UN',
        inSyria: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      throw error;
    }
    console.log('Login successful');
  };

  const register = async (email: string, password: string, name: string, expertise: ExpertiseType, location: 'syria' | 'international') => {
    console.log('Attempting registration for:', email);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          expertise,
          location,
        },
      },
    });

    if (error) {
      console.error('Registration error:', error);
      throw error;
    }
    console.log('Registration successful');
  };

  const logout = async () => {
    console.log('Logging out...');
    
    try {
      // Clear local state first to provide immediate feedback
      setUser(null);
      setSession(null);
      
      // Then attempt to sign out from Supabase
      // If there's no session, this might fail, but that's okay
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.warn('Logout warning (but continuing):', error.message);
        // Don't throw the error since we've already cleared local state
        // This handles cases where the session is already expired or missing
      } else {
        console.log('Logout successful');
      }
    } catch (error) {
      console.warn('Logout error (but continuing):', error);
      // Even if logout fails on the server side, we've cleared local state
      // so the user appears logged out in the UI
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      geolocation,
      isLoading,
      login,
      register,
      logout,
      signOut: logout, // Add signOut as an alias
    }}>
      {children}
    </AuthContext.Provider>
  );
};
