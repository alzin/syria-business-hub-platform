
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Post } from '@/types';

interface PostDetailHeaderProps {
  post: Post;
  canEditPost: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const PostDetailHeader: React.FC<PostDetailHeaderProps> = ({
  post,
  canEditPost,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Badge variant={post.type === 'question' ? 'default' : 'secondary'}>
          {post.type === 'question' ? 'Question' : 'News'}
        </Badge>
        <Badge variant="outline">{post.category}</Badge>
      </div>
      
      {canEditPost && (
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

export default PostDetailHeader;
