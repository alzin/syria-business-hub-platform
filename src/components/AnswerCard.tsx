
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import AnswerHeader from '@/components/answer/AnswerHeader';
import AnswerContent from '@/components/answer/AnswerContent';
import AnswerComments from '@/components/answer/AnswerComments';
import AnswerDialogs from '@/components/answer/AnswerDialogs';
import { Answer, Comment } from '@/types';

interface AnswerCardProps {
  answer: Answer;
  postId: string;
  comments?: Comment[];
}

const AnswerCard: React.FC<AnswerCardProps> = ({ answer, postId, comments = [] }) => {
  const { user } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const canEditAnswer = user && user.id === answer.author.id;
  
  const answerComments = comments.filter(comment => comment.answerId === answer.id);

  return (
    <>
      <Card className="border-l-4 border-l-blue-200">
        <CardContent className="pt-6">
          <AnswerHeader
            answer={answer}
            canEditAnswer={canEditAnswer}
            onEdit={() => setShowEditDialog(true)}
            onDelete={() => setShowDeleteDialog(true)}
          />

          <AnswerContent answer={answer} commentsCount={answerComments.length} />

          <AnswerComments
            answerId={answer.id}
            postId={postId}
            comments={comments}
          />
        </CardContent>
      </Card>

      <AnswerDialogs
        answer={answer}
        postId={postId}
        canEditAnswer={canEditAnswer}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
        onEditDialogChange={setShowEditDialog}
        onDeleteDialogChange={setShowDeleteDialog}
      />
    </>
  );
};

export default AnswerCard;
