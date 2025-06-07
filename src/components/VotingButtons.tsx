
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useVoting } from '@/hooks/useVoting';
import { useAuth } from '@/contexts/AuthContext';

interface VotingButtonsProps {
  itemId: string;
  itemType: 'post' | 'answer';
  votes: number;
  size?: 'sm' | 'default';
}

const VotingButtons: React.FC<VotingButtonsProps> = ({ 
  itemId, 
  itemType, 
  votes, 
  size = 'default' 
}) => {
  const { user } = useAuth();
  const { voteOnPost, voteOnAnswer } = useVoting();

  const handleVote = (voteType: 'up' | 'down') => {
    if (!user) return;

    if (itemType === 'post') {
      voteOnPost.mutate({ postId: itemId, voteType });
    } else {
      voteOnAnswer.mutate({ answerId: itemId, voteType });
    }
  };

  const buttonSize = size === 'sm' ? 'sm' : 'default';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('up')}
        disabled={!user || voteOnPost.isPending || voteOnAnswer.isPending}
        className="hover:bg-green-50 hover:text-green-600"
      >
        <ThumbsUp className={iconSize} />
      </Button>
      
      <span className={`font-medium ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {votes}
      </span>
      
      <Button
        variant="ghost"
        size={buttonSize}
        onClick={() => handleVote('down')}
        disabled={!user || voteOnPost.isPending || voteOnAnswer.isPending}
        className="hover:bg-red-50 hover:text-red-600"
      >
        <ThumbsDown className={iconSize} />
      </Button>
    </div>
  );
};

export default VotingButtons;
