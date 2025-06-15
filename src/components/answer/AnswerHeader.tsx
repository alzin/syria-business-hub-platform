
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CheckCircle, MoreVertical } from 'lucide-react';
import { Answer } from '@/types';

interface AnswerHeaderProps {
  answer: Answer;
  canEditAnswer: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const AnswerHeader: React.FC<AnswerHeaderProps> = ({
  answer,
  canEditAnswer,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-2">
        {answer.verified && (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Answer
          </Badge>
        )}
      </div>
      
      {canEditAnswer && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AnswerHeader;
