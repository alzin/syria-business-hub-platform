
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useVoting } from '@/hooks/useVoting';
import { useAuth } from '@/contexts/AuthContext';

interface VotingButtonsProps {
  itemId: string;
  itemType: 'post' | 'answer';
  votes: number;
  authorId: string;
  size?: 'sm' | 'default';
}

const VotingButtons: React.FC<VotingButtonsProps> = ({ 
  itemId, 
  itemType, 
  votes, 
  authorId,
  size = 'default' 
}) => {
  const { user } = useAuth();
  const { voteOnPost, voteOnAnswer, getUserVoteForPost, getUserVoteForAnswer } = useVoting();

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) return;

    if (itemType === 'post') {
      voteOnPost.mutate({ postId: itemId, voteType });
    } else {
      voteOnAnswer.mutate({ answerId: itemId, voteType });
    }
  };

  // Get the user's current vote for this item
  const userVote = itemType === 'post' 
    ? getUserVoteForPost(itemId)
    : getUserVoteForAnswer(itemId);

  // Check if user is the author of this item
  const isOwnItem = user?.id === authorId;

  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  const isLoading = voteOnPost.isPending || voteOnAnswer.isPending;

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('up')}
        disabled={!user || isLoading || isOwnItem}
        className={`hover:bg-green-50 hover:text-green-600 ${
          userVote?.vote_type === 'up' ? 'bg-green-50 text-green-600' : ''
        } ${isOwnItem ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isOwnItem ? 'You cannot vote on your own content' : 'Upvote'}
      >
        <ThumbsUp className={iconSize} />
      </Button>
      
      <span className={`font-medium ${size === 'sm' ? 'text-sm' : 'text-base'} min-w-[24px] text-center`}>
        {votes}
      </span>
      
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('down')}
        disabled={!user || isLoading || isOwnItem}
        className={`hover:bg-red-50 hover:text-red-600 ${
          userVote?.vote_type === 'down' ? 'bg-red-50 text-red-600' : ''
        } ${isOwnItem ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isOwnItem ? 'You cannot vote on your own content' : 'Downvote'}
      >
        <ThumbsDown className={iconSize} />
      </Button>
    </div>
  );
};

export default VotingButtons;
