
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// Removed Badge from ui/badge, MapPin, and useTranslation as they were for the location feature here
import { Calendar, User as UserIcon } from 'lucide-react';
import { User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
// Removed useTranslation import

interface AuthorInfoProps {
  author: User;
  size?: 'sm' | 'default';
  showDate?: boolean;
  createdAt?: Date;
  onClick?: () => void;
  // Removed showLocation prop
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  size = 'default', 
  showDate = true,
  createdAt,
  onClick
  // Removed showLocation from destructuring
}) => {
  const navigate = useNavigate();
  // Removed const { t } = useTranslation();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/user/${author.id}`);
    }
  };

  const avatarSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:opacity-80" 
      onClick={handleClick}
    >
      <Avatar className={avatarSize}>
        {author.avatar ? (
          <AvatarImage src={author.avatar} alt={author.name} />
        ) : (
          <AvatarFallback className="bg-blue-100 text-blue-600">
            <UserIcon className="w-4 h-4" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className={`font-medium text-gray-900 ${textSize}`}>{author.name}</p>
          <ExpertiseBadge 
            expertiseCategory={author.expertiseCategory} 
            verified={author.verified} 
            size={size === 'sm' ? 'sm' : 'md'}
          />
           {/* Removed location badge display from here */}
        </div>
        
        {showDate && size === 'default' && (
          <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
            <Calendar className="w-3 h-3" />
            <span>
              {createdAt 
                ? formatDistanceToNow(createdAt, { addSuffix: true })
                : `Joined ${author.joinedAt.toLocaleDateString()}`
              }
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
