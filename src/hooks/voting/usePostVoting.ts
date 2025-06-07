
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { updatePostVoteCache } from './voteCache';
import { useUserVotes } from './useUserVotes';

export const usePostVoting = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { userVotes } = useUserVotes();

  const voteOnPost = useMutation({
    mutationFn: async ({ postId, voteType }: { postId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('User must be logged in');

      // Check if user is trying to vote on their own post
      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('author_id')
        .eq('id', postId)
        .single();

      if (fetchError) throw fetchError;
      
      if (post.author_id === user.id) {
        throw new Error('You cannot vote on your own post');
      }

      // Check if user has already voted
      const existingVote = userVotes?.find(vote => vote.post_id === postId);
      
      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Same vote type - remove the vote
          const { error } = await supabase
            .from('votes')
            .delete()
            .eq('user_id', user.id)
            .eq('post_id', postId);
          
          if (error) throw error;
        } else {
          // Different vote type - update the vote
          const { error } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('user_id', user.id)
            .eq('post_id', postId);
          
          if (error) throw error;
        }
      } else {
        // No existing vote - create new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            user_id: user.id,
            post_id: postId,
            vote_type: voteType,
          });
        
        if (error) throw error;
      }

      // Manually update the post vote count
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('post_id', postId);

      if (votesError) throw votesError;

      const voteCount = votes.reduce((sum, vote) => {
        return sum + (vote.vote_type === 'up' ? 1 : -1);
      }, 0);

      const { error: updateError } = await supabase
        .from('posts')
        .update({ votes: voteCount })
        .eq('id', postId);

      if (updateError) throw updateError;

      return voteCount;
    },
    onSuccess: (newVoteCount, variables) => {
      updatePostVoteCache(queryClient, variables.postId, newVoteCount, user?.id);

      toast({
        title: "Vote recorded!",
        description: "Your vote has been registered.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to vote",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { voteOnPost };
};
