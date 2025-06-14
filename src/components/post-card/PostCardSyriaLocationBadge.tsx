
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { User } from '@/types';

interface PostCardSyriaLocationBadgeProps {
  author: User;
}

const PostCardSyriaLocationBadge: React.FC<PostCardSyriaLocationBadgeProps> = ({ author }) => {
  const { t } = useTranslation();

  if (author.location !== 'syria') {
    return null;
  }

  return (
    <div className="mt-1">
      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
        <MapPin className="w-3 h-3 mr-1" />
        {t('syria')}
      </Badge>
    </div>
  );
};

export default PostCardSyriaLocationBadge;
