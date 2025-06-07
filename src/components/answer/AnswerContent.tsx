
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import AuthorInfo from '@/components/AuthorInfo';
import PostStats from '@/components/PostStats';
import { Answer } from '@/types';

interface AnswerContentProps {
  answer: Answer;
}

const AnswerContent: React.FC<AnswerContentProps> = ({ answer }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleViewUser = () => {
    navigate(`/user/${answer.author.id}`);
  };

  // Get fresh vote count for answer from query cache
  const getFreshVoteCount = () => {
    const postData = queryClient.getQueryData(['post', answer.postId]);
    if (postData && typeof postData === 'object' && 'answers' in postData) {
      const answers = postData.answers as any[];
      const cachedAnswer = answers?.find((a: any) => a.id === answer.id);
      if (cachedAnswer && 'votes' in cachedAnswer) {
        return cachedAnswer.votes as number;
      }
    }
    return answer.votes;
  };

  const currentVotes = getFreshVoteCount();

  return (
    <>
      {/* Answer content */}
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
      </div>

      {/* Author info and stats */}
      <div className="flex items-center justify-between pt-4 border-t">
        <AuthorInfo 
          author={answer.author} 
          size="sm" 
          onClick={handleViewUser}
        />
        
        <div className="flex items-center space-x-4">
          <PostStats
            type="question"
            commentsCount={0}
            votes={currentVotes}
            createdAt={answer.createdAt}
            size="sm"
          />
        </div>
      </div>
    </>
  );
};

export default AnswerContent;
