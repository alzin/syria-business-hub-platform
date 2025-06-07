
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useVoting = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const voteOnPost = useMutation({
    mutationFn: async ({ postId, voteType }: { postId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('Must be logged in to vote');

      // For now, we'll just update the votes count directly
      // In a real app, you'd want to track individual votes in a separate table
      const { data: currentPost } = await supabase
        .from('posts')
        .select('votes')
        .eq('id', postId)
        .single();

      if (!currentPost) throw new Error('Post not found');

      const newVotes = voteType === 'up' ? currentPost.votes + 1 : currentPost.votes - 1;

      const { error } = await supabase
        .from('posts')
        .update({ votes: newVotes })
        .eq('id', postId);

      if (error) throw error;

      return { postId, newVotes };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['post', data.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Vote recorded",
        description: "Your vote has been recorded successfully.",
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

  const voteOnAnswer = useMutation({
    mutationFn: async ({ answerId, voteType }: { answerId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('Must be logged in to vote');

      const { data: currentAnswer } = await supabase
        .from('answers')
        .select('votes')
        .eq('id', answerId)
        .single();

      if (!currentAnswer) throw new Error('Answer not found');

      const newVotes = voteType === 'up' ? currentAnswer.votes + 1 : currentAnswer.votes - 1;

      const { error } = await supabase
        .from('answers')
        .update({ votes: newVotes })
        .eq('id', answerId);

      if (error) throw error;

      return { answerId, newVotes };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      toast({
        title: "Vote recorded",
        description: "Your vote has been recorded successfully.",
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

  return {
    voteOnPost,
    voteOnAnswer,
  };
};
