
import React from 'react';
import { useTranslation } from 'react-i18next';
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
import AuthorInfo from '@/components/AuthorInfo';

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
  const { t } = useTranslation();

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'question':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'news':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'article':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'business_idea':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'question':
        return t('question');
      case 'news':
        return t('news');
      case 'article':
        return t('Article');
      case 'business_idea':
        return t('Business Idea');
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={`text-xs font-medium ${getPostTypeColor(post.type)}`}
          >
            {getPostTypeLabel(post.type)}
          </Badge>
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
                {t('Edit')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600"
              >
                {t('Delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
        <AuthorInfo 
          author={post.author} 
          createdAt={post.createdAt}
          showDate={true}
        />
      </div>
    </div>
  );
};

export default PostDetailHeader;
