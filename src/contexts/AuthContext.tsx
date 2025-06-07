
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GeolocationData } from '@/types';

interface AuthContextType {
  user: User | null;
  geolocation: GeolocationData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, expertise: string) => Promise<void>;
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
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Detect geolocation
    detectGeolocation();
    setIsLoading(false);
  }, []);

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
      // Default to non-Syrian location
      setGeolocation({
        country: 'Unknown',
        countryCode: 'UN',
        inSyria: false
      });
    }
  };

  const login = async (email: string, password: string) => {
    // Mock login - in real implementation, this would call your auth API
    const mockUser: User = {
      id: '1',
      email,
      name: 'Demo User',
      expertise: 'founder',
      location: geolocation?.inSyria ? 'syria' : 'international',
      accessLevel: geolocation?.inSyria ? 'registered' : 'registered',
      verified: false,
      joinedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    console.log('User logged in:', mockUser);
  };

  const register = async (email: string, password: string, name: string, expertise: string) => {
    // Mock registration
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      expertise: expertise as any,
      location: geolocation?.inSyria ? 'syria' : 'international',
      accessLevel: geolocation?.inSyria ? 'registered' : 'registered',
      verified: false,
      joinedAt: new Date(),
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    console.log('User registered:', mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
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
