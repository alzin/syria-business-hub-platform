
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorInfo from '@/components/AuthorInfo';
import PostStats from '@/components/PostStats';
import { Answer } from '@/types';
import SanitizedContent from '@/components/SanitizedContent';

interface AnswerContentProps {
  answer: Answer;
  commentsCount: number;
}

const AnswerContent: React.FC<AnswerContentProps> = ({ answer, commentsCount }) => {
  const navigate = useNavigate();

  const handleViewUser = () => {
    navigate(`/user/${answer.author.id}`);
  };

  return (
    <>
      {/* Answer content */}
      <div className="prose max-w-none mb-6">
        <SanitizedContent
          html={answer.content}
          className="text-gray-700 whitespace-pre-wrap"
        />
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
            type="answer"
            commentsCount={commentsCount}
            createdAt={answer.createdAt}
            size="sm"
          />
        </div>
      </div>
    </>
  );
};

export default AnswerContent;
