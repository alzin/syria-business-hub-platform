
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useComments = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: async ({ content, postId, answerId }: { content: string; postId: string; answerId?: string }) => {
      if (!user) throw new Error('User must be logged in');

      const { error } = await supabase
        .from('comments')
        .insert({
          content,
          author_id: user.id,
          post_id: postId,
          answer_id: answerId || null,
        });

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to post comment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    addComment,
  };
};
