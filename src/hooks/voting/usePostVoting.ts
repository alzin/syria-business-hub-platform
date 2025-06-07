
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

      // Let the database trigger handle the vote count update
      // Just fetch the updated post to get the new vote count
      const { data: updatedPost, error: updateError } = await supabase
        .from('posts')
        .select('votes')
        .eq('id', postId)
        .single();

      if (updateError) throw updateError;

      return updatedPost.votes;
    },
    onSuccess: (newVoteCount, variables) => {
      // Update cache with the new vote count from database
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
