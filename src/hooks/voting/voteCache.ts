
import { QueryClient } from '@tanstack/react-query';

export const updatePostVoteCache = (
  queryClient: QueryClient,
  postId: string,
  newVoteCount: number,
  userId?: string
) => {
  // Invalidate and refetch queries
  queryClient.invalidateQueries({ queryKey: ['post', postId] });
  queryClient.invalidateQueries({ queryKey: ['posts'] });
  queryClient.invalidateQueries({ queryKey: ['user-votes', userId] });
  
  // Optimistically update the cache
  queryClient.setQueryData(['post', postId], (oldData: any) => {
    if (oldData) {
      return { ...oldData, votes: newVoteCount };
    }
    return oldData;
  });
};

export const updateAnswerVoteCache = (
  queryClient: QueryClient,
  postId: string,
  answerId: string,
  newVoteCount: number,
  userId?: string
) => {
  // Invalidate and refetch queries
  queryClient.invalidateQueries({ queryKey: ['post', postId] });
  queryClient.invalidateQueries({ queryKey: ['posts'] });
  queryClient.invalidateQueries({ queryKey: ['user-votes', userId] });

  // Optimistically update the cache
  queryClient.setQueryData(['post', postId], (oldData: any) => {
    if (oldData && oldData.answers) {
      const updatedAnswers = oldData.answers.map((answer: any) => 
        answer.id === answerId 
          ? { ...answer, votes: newVoteCount }
          : answer
      );
      return { ...oldData, answers: updatedAnswers };
    }
    return oldData;
  });
};
