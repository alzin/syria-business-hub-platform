
import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardCreationDateProps {
  createdAt: Date;
}

const PostCardCreationDate: React.FC<PostCardCreationDateProps> = ({ createdAt }) => {
  return (
    <div className="flex items-center text-xs text-gray-500">
      <Calendar className="w-3 h-3 mr-1" />
      {formatDistanceToNow(createdAt, { addSuffix: true })}
    </div>
  );
};

export default PostCardCreationDate;
