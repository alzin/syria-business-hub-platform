
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useVoting = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's existing votes for posts and answers
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
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-votes', user?.id] });
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

      // Check if user is trying to vote on their own answer
      const { data: answer, error: fetchError } = await supabase
        .from('answers')
        .select('author_id')
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

      // Manually update the answer vote count
      const { data: votes, error: votesError } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('answer_id', answerId);

      if (votesError) throw votesError;

      const voteCount = votes.reduce((sum, vote) => {
        return sum + (vote.vote_type === 'up' ? 1 : -1);
      }, 0);

      const { error: updateError } = await supabase
        .from('answers')
        .update({ votes: voteCount })
        .eq('id', answerId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-votes', user?.id] });
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

  // Helper function to get user's vote for a specific post
  const getUserVoteForPost = (postId: string) => {
    return userVotes?.find(vote => vote.post_id === postId);
  };

  // Helper function to get user's vote for a specific answer
  const getUserVoteForAnswer = (answerId: string) => {
    return userVotes?.find(vote => vote.answer_id === answerId);
  };

  return {
    voteOnPost,
    voteOnAnswer,
    getUserVoteForPost,
    getUserVoteForAnswer,
    userVotes,
  };
};
