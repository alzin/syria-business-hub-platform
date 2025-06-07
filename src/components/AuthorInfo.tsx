
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { User as UserIcon } from 'lucide-react';
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
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
      onClick={handleClick}
    >
      <div className={`${avatarSize} bg-gray-300 rounded-full flex items-center justify-center`}>
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} className={`${avatarSize} rounded-full`} />
        ) : (
          <UserIcon className={`${iconSize} text-gray-500`} />
        )}
      </div>
      <div>
        <p className={`font-medium text-gray-900 ${textSize}`}>{author.name}</p>
        <ExpertiseBadge expertise={author.expertise} verified={author.verified} size="sm" />
      </div>
    </div>
  );
};

export default AuthorInfo;
