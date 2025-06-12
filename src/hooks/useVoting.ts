
import { usePostVoting } from './voting/usePostVoting';
import { useAnswerVoting } from './voting/useAnswerVoting';
import { useUserVotes } from './voting/useUserVotes';

export const useVoting = () => {
  const { voteOnPost } = usePostVoting();
  const { voteOnAnswer } = useAnswerVoting();
  const { userVotes, getUserVoteForPost, getUserVoteForAnswer } = useUserVotes();

  return {
    voteOnPost,
    voteOnAnswer,
    getUserVoteForPost,
    getUserVoteForAnswer,
    userVotes,
  };
};
