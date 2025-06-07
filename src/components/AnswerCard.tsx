
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorInfo from '@/components/AuthorInfo';
import VotingButtons from '@/components/VotingButtons';
import CommentCard from '@/components/CommentCard';
import CommentForm from '@/components/CommentForm';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { Answer, Comment } from '@/types';

interface AnswerCardProps {
  answer: Answer;
  postId: string;
  comments?: Comment[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, postId, comments = [] }) => {
  const navigate = useNavigate();
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleViewUser = () => {
    navigate(`/user/${answer.author.id}`);
  };

  const answerComments = comments.filter(comment => comment.answerId === answer.id);

  return (
    <Card className="border-l-4 border-l-blue-200">
      <CardContent className="pt-6">
        {/* Answer header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {answer.verified && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Answer
              </Badge>
            )}
          </div>
          
          <VotingButtons 
            itemId={answer.id} 
            itemType="answer" 
            votes={answer.votes}
          />
        </div>

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
          
          <div className="text-sm text-gray-500">
            {answer.createdAt.toLocaleDateString()}
          </div>
        </div>

        {/* Comments section */}
        {answerComments.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              Comments ({answerComments.length})
            </h4>
            <div className="space-y-3">
              {answerComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}

        {/* Add comment */}
        <div className="mt-4 pt-4 border-t">
          {!showCommentForm ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentForm(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Add comment
            </Button>
          ) : (
            <CommentForm
              postId={postId}
              answerId={answer.id}
              onCancel={() => setShowCommentForm(false)}
              placeholder="Comment on this answer..."
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnswerCard;
