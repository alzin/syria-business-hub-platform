
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, User as UserIcon } from 'lucide-react';
import { User } from '@/types';

interface AuthorInfoProps {
  author: User;
  size?: 'sm' | 'default';
  onClick?: () => void;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author, size = 'default', onClick }) => {
  const navigate = useNavigate();

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
        <AvatarFallback className="bg-blue-100 text-blue-600">
          {author.avatar ? (
            <img src={author.avatar} alt={author.name} className={`${avatarSize} rounded-full`} />
          ) : (
            <UserIcon className="w-4 h-4" />
          )}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className={`font-medium text-gray-900 ${textSize}`}>{author.name}</p>
          <ExpertiseBadge 
            expertise={author.expertise} 
            verified={author.verified} 
            size={size === 'sm' ? 'sm' : 'md'}
          />
        </div>
        
        {size === 'default' && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Joined {author.joinedAt.toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorInfo;
