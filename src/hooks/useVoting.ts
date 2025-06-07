
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useVoting = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const voteOnPost = useMutation({
    mutationFn: async ({ postId, voteType }: { postId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('User must be logged in');

      // For now, we'll just increment/decrement the votes directly
      // In a real app, you'd want to track individual votes to prevent double voting
      const increment = voteType === 'up' ? 1 : -1;
      
      const { error } = await supabase
        .from('posts')
        .update({ 
          votes: supabase.sql`votes + ${increment}` 
        })
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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

  const voteOnAnswer = useMutation({
    mutationFn: async ({ answerId, voteType }: { answerId: string; voteType: 'up' | 'down' }) => {
      if (!user) throw new Error('User must be logged in');

      const increment = voteType === 'up' ? 1 : -1;
      
      const { error } = await supabase
        .from('answers')
        .update({ 
          votes: supabase.sql`votes + ${increment}` 
        })
        .eq('id', answerId);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      // We need to get the post ID to invalidate the right queries
      queryClient.invalidateQueries({ queryKey: ['post'] });
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

  return {
    voteOnPost,
    voteOnAnswer,
  };
};
