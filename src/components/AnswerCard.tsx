
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAnswerVerification } from '@/hooks/useAnswerVerification';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import VotingButtons from '@/components/VotingButtons';
import CommentCard from '@/components/CommentCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { Answer } from '@/types';

interface AnswerCardProps {
  answer: Answer;
  postId: string;
  comments?: any[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, postId, comments = [] }) => {
  const { user } = useAuth();
  const { verifyAnswer, unverifyAnswer } = useAnswerVerification();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState('');

  const answerComments = comments.filter(comment => comment.answerId === answer.id);
  const isVerifiedExpert = user?.verified && user?.expertise;
  const canVerify = isVerifiedExpert && user?.id !== answer.author.id;

  const handleVerifyToggle = () => {
    if (answer.verified) {
      unverifyAnswer.mutate(answer.id);
    } else {
      verifyAnswer.mutate(answer.id);
    }
  };

  return (
    <div className={`border rounded-lg p-6 ${answer.verified ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
      {/* Answer Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {answer.author.avatar ? (
              <img src={answer.author.avatar} alt={answer.author.name} className="w-10 h-10 rounded-full" />
            ) : (
              <User className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div>
            <p className="font-medium text-gray-900">{answer.author.name}</p>
            <div className="flex items-center space-x-2">
              <ExpertiseBadge expertise={answer.author.expertise} verified={answer.author.verified} size="sm" />
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{answer.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {answer.verified && (
            <Badge variant="default" className="bg-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
          
          {canVerify && (
            <Button
              variant={answer.verified ? "outline" : "default"}
              size="sm"
              onClick={handleVerifyToggle}
              disabled={verifyAnswer.isPending || unverifyAnswer.isPending}
              className={answer.verified ? "text-red-600 hover:bg-red-50" : "bg-green-600 hover:bg-green-700"}
            >
              <Shield className="w-3 h-3 mr-1" />
              {answer.verified ? 'Unverify' : 'Verify'}
            </Button>
          )}
        </div>
      </div>

      {/* Answer Content */}
      <div className="prose max-w-none mb-4">
        <p className="text-gray-700 whitespace-pre-wrap">{answer.content}</p>
      </div>

      {/* Answer Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <VotingButtons 
          itemId={answer.id} 
          itemType="answer" 
          votes={answer.votes} 
          size="sm"
        />
        
        <div className="flex items-center space-x-4">
          {answerComments.length > 0 && (
            <span className="text-sm text-gray-500 flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {answerComments.length} comment{answerComments.length !== 1 ? 's' : ''}
            </span>
          )}
          
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCommentForm(!showCommentForm)}
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Comment
            </Button>
          )}
        </div>
      </div>

      {/* Comments */}
      {answerComments.length > 0 && (
        <div className="mt-6 space-y-3">
          <h5 className="font-medium text-gray-900">Comments</h5>
          {answerComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {/* Comment Form */}
      {showCommentForm && user && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={2}
            className="mb-3"
          />
          <div className="flex space-x-2">
            <Button size="sm" disabled={!newComment.trim()}>
              Post Comment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowCommentForm(false);
                setNewComment('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerCard;
