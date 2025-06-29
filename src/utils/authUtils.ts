
import { supabase } from '@/integrations/supabase/client';

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
  location: string,
  phoneNumber?: string,
  phoneCountryCode?: string,
  expertiseCategory?: string,
  expertiseSpecialization?: string
) => {
  console.log('Attempting registration for:', email);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/`,
      data: {
        name,
        location,
        phone_number: phoneNumber,
        phone_country_code: phoneCountryCode,
        expertise_category: expertiseCategory,
        expertise_specialization: expertiseSpecialization,
      },
    },
  });

  if (error) {
    console.error('Registration error:', error);
    throw error;
  }

  // Check if this is a repeated signup (user already exists)
  // Supabase returns user data even for existing users, but without creating a new account
  if (data.user && data.user.email_confirmed_at) {
    console.log('User already exists and is verified:', email);
    throw new Error('Email address already registered');
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
