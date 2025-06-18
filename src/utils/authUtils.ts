
import { supabase } from '@/integrations/supabase/client';
import { ExpertiseType } from '@/types';

export const loginUser = async (email: string, password: string) => {
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

export const registerUser = async (
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
  console.log('Attempting registration for:', email);
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
      data: {
        name,
        expertise,
        location,
        phone_number: phoneNumber,
        phone_country_code: phoneCountryCode,
        specialization,
        industry_sector: industrySector,
      },
    },
  });

  if (error) {
    console.error('Registration error:', error);
    throw error;
  }
  console.log('Registration successful');
};

export const logoutUser = async () => {
  console.log('Logging out...');
  
  try {
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
