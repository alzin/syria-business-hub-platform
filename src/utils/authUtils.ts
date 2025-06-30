
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

  // Check if a verified profile already exists with this email
  const {
    data: existingProfile,
    error: existingError,
  } = await supabase
    .from('profiles')
    .select('verified')
    .eq('email', email)
    .maybeSingle();

  if (existingError) {
    console.error('Error checking existing profile:', existingError);
    throw existingError;
  }

  if (existingProfile && existingProfile.verified) {
    const error = new Error('User already registered');
    console.error('Registration error:', error);
    throw error;
  }

  const { error } = await supabase.auth.signUp({
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
