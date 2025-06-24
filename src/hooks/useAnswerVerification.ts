
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

export const useAnswerVerification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const verifyAnswer = useMutation({
    mutationFn: async (answerId: string) => {
      if (!user) throw new Error('Must be logged in');

      // Check if user is verified and has expertise to verify answers
      const { data: userProfile } = await supabase
        .from('profiles')
        .select('verified, expertise_category')
        .eq('id', user.id)
        .single();

      if (!userProfile?.verified) {
        throw new Error('Only verified experts can verify answers');
      }

      const { error } = await supabase
        .from('answers')
        .update({ verified: true })
        .eq('id', answerId);

      if (error) throw error;

      return answerId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      toast({
        title: "Answer verified",
        description: "The answer has been verified as correct.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to verify answer",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const unverifyAnswer = useMutation({
    mutationFn: async (answerId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('answers')
        .update({ verified: false })
        .eq('id', answerId);

      if (error) throw error;

      return answerId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      toast({
        title: "Answer verification removed",
        description: "The answer verification has been removed.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to remove verification",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    verifyAnswer,
    unverifyAnswer,
  };
};
