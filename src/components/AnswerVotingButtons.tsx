
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useVoting } from '@/hooks/useVoting';
import { useAuth } from '@/contexts/AuthContext';

interface AnswerVotingButtonsProps {
  answerId: string;
  votes: number;
  authorId: string;
  size?: 'sm' | 'default';
}

const AnswerVotingButtons: React.FC<AnswerVotingButtonsProps> = ({ 
  answerId, 
  votes, 
  authorId,
  size = 'default' 
}) => {
  const { user } = useAuth();
  const { voteOnAnswer, getUserVoteForAnswer } = useVoting();

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) return;
    voteOnAnswer.mutate({ answerId, voteType });
  };

  // Get the user's current vote for this answer
  const userVote = getUserVoteForAnswer(answerId);

  // Check if user is the author of this answer
  const isOwnAnswer = user?.id === authorId;

  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  const isLoading = voteOnAnswer.isPending;

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('up')}
        disabled={!user || isLoading || isOwnAnswer}
        className={`hover:bg-green-50 hover:text-green-600 ${
          userVote?.vote_type === 'up' ? 'bg-green-50 text-green-600' : ''
        } ${isOwnAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isOwnAnswer ? 'You cannot vote on your own answer' : 'Upvote'}
      >
        <ThumbsUp className={iconSize} />
      </Button>
      
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('down')}
        disabled={!user || isLoading || isOwnAnswer}
        className={`hover:bg-red-50 hover:text-red-600 ${
          userVote?.vote_type === 'down' ? 'bg-red-50 text-red-600' : ''
        } ${isOwnAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isOwnAnswer ? 'You cannot vote on your own answer' : 'Downvote'}
      >
        <ThumbsDown className={iconSize} />
      </Button>
    </div>
  );
};

export default AnswerVotingButtons;
