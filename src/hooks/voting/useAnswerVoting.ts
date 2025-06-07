
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { updateAnswerVoteCache } from './voteCache';
import { useUserVotes } from './useUserVotes';

export const useAnswerVoting = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { userVotes } = useUserVotes();

  const voteOnAnswer = useMutation({
    mutationFn: async ({ answerId, voteType }: { answerId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('User must be logged in');

      // Check if user is trying to vote on their own answer
      const { data: answer, error: fetchError } = await supabase
        .from('answers')
        .select('author_id, post_id')
        .eq('id', answerId)
        .single();

      if (fetchError) throw fetchError;
      
      if (answer.author_id === user.id) {
        throw new Error('You cannot vote on your own answer');
      }

      // Check if user has already voted
      const existingVote = userVotes?.find(vote => vote.answer_id === answerId);
      
      if (existingVote) {
        if (existingVote.vote_type === voteType) {
          // Same vote type - remove the vote
          const { error } = await supabase
            .from('votes')
            .delete()
            .eq('user_id', user.id)
            .eq('answer_id', answerId);
          
          if (error) throw error;
        } else {
          // Different vote type - update the vote
          const { error } = await supabase
            .from('votes')
            .update({ vote_type: voteType })
            .eq('user_id', user.id)
            .eq('answer_id', answerId);
          
          if (error) throw error;
        }
      } else {
        // No existing vote - create new vote
        const { error } = await supabase
          .from('votes')
          .insert({
            user_id: user.id,
            answer_id: answerId,
            vote_type: voteType,
          });
        
        if (error) throw error;
      }

      // Let the database trigger handle the vote count update
      // Just fetch the updated answer to get the new vote count
      const { data: updatedAnswer, error: updateError } = await supabase
        .from('answers')
        .select('votes')
        .eq('id', answerId)
        .single();

      if (updateError) throw updateError;

      return { voteCount: updatedAnswer.votes, postId: answer.post_id };
    },
    onSuccess: ({ voteCount, postId }, variables) => {
      updateAnswerVoteCache(queryClient, postId, variables.answerId, voteCount, user?.id);

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

  return { voteOnAnswer };
};
