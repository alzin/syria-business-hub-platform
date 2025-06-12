
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useUserVotes = () => {
  const { user } = useAuth();

  const { data: userVotes } = useQuery({
    queryKey: ['user-votes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('votes')
        .select('post_id, answer_id, vote_type')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  // Helper function to get user's vote for a specific post
  const getUserVoteForPost = (postId: string) => {
    return userVotes?.find(vote => vote.post_id === postId);
  };

  // Helper function to get user's vote for a specific answer
  const getUserVoteForAnswer = (answerId: string) => {
    return userVotes?.find(vote => vote.answer_id === answerId);
  };

  return {
    userVotes,
    getUserVoteForPost,
    getUserVoteForAnswer,
  };
};
