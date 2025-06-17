
import { useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, ExpertiseType } from '@/types';

export const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

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
          location: profile.location,
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

  const clearUser = () => {
    setUser(null);
  };

  return {
    user,
    fetchUserProfile,
    clearUser
  };
};
