
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExpertiseType } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, Computer, Gavel, Rocket } from 'lucide-react';

interface ExpertiseBadgeProps {
  expertise: ExpertiseType;
  verified?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ExpertiseBadge: React.FC<ExpertiseBadgeProps> = ({ 
  expertise, 
  verified = false, 
  size = 'md' 
}) => {
  const { t } = useTranslation();

  const expertiseConfig = {
    legal: {
      label: t('legalExpert'),
      icon: Gavel,
      color: 'bg-blue-500 hover:bg-blue-600',
      emoji: '👨‍⚖️'
    },
    investor: {
      label: t('investor'),
      icon: Briefcase,
      color: 'bg-green-500 hover:bg-green-600',
      emoji: '💼'
    },
    founder: {
      label: t('startupFounder'),
      icon: Rocket,
      color: 'bg-purple-500 hover:bg-purple-600',
      emoji: '🚀'
    },
    developer: {
      label: t('developer'),
      icon: Computer,
      color: 'bg-orange-500 hover:bg-orange-600',
      emoji: '💻'
    },
    government: {
      label: t('governmentRep'),
      icon: Building,
      color: 'bg-gray-600 hover:bg-gray-700',
      emoji: '🏛'
    }
  };

  const config = expertiseConfig[expertise];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <Badge 
      className={`${config.color} text-white ${sizeClasses[size]} flex items-center gap-1 font-medium`}
    >
      <span className="text-xs">{config.emoji}</span>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
      {verified && <span className="text-yellow-300">✓</span>}
    </Badge>
  );
};

export default ExpertiseBadge;
