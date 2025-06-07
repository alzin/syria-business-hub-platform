
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, GeolocationData, ExpertiseType } from '@/types';

interface AuthContextType {
  user: User | null;
  geolocation: GeolocationData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, expertise: ExpertiseType, location: 'syria' | 'international') => Promise<void>;
  logout: () => void;
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
  const [geolocation, setGeolocation] = useState<GeolocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Detect geolocation
    detectGeolocation();

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

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
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const detectGeolocation = async () => {
    try {
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, expertise: ExpertiseType, location: 'syria' | 'international') => {
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
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      geolocation,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
