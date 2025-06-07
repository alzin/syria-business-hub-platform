
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorInfo from '@/components/AuthorInfo';
import PostStats from '@/components/PostStats';
import { Answer } from '@/types';

interface AnswerContentProps {
  answer: Answer;
}

const AnswerContent: React.FC<AnswerContentProps> = ({ answer }) => {
  const navigate = useNavigate();

  const handleViewUser = () => {
    navigate(`/user/${answer.author.id}`);
  };

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
            votes={answer.votes}
            createdAt={answer.createdAt}
            size="sm"
            itemId={answer.id}
            itemType="answer"
          />
        </div>
      </div>
    </>
  );
};

export default AnswerContent;
