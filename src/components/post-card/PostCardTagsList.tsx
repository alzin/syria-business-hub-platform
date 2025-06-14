
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PostCardTagsListProps {
  tags: string[];
}

const PostCardTagsList: React.FC<PostCardTagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {tags.slice(0, 3).map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
      {tags.length > 3 && (
        <Badge variant="secondary" className="text-xs">
          +{tags.length - 3}
        </Badge>
      )}
    </div>
  );
};

export default PostCardTagsList;
