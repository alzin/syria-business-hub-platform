
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Code, Briefcase, Building } from 'lucide-react';
import { ExpertiseType } from '@/types';

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
  const getExpertiseConfig = (expertise: ExpertiseType) => {
    switch (expertise) {
      case 'legal':
        return { icon: Shield, label: 'Legal Expert', color: 'bg-blue-100 text-blue-800' };
      case 'investor':
        return { icon: Star, label: 'Investor', color: 'bg-yellow-100 text-yellow-800' };
      case 'founder':
        return { icon: Briefcase, label: 'Founder', color: 'bg-purple-100 text-purple-800' };
      case 'developer':
        return { icon: Code, label: 'Developer', color: 'bg-green-100 text-green-800' };
      case 'government':
        return { icon: Building, label: 'Government', color: 'bg-gray-100 text-gray-800' };
      default:
        return { icon: Briefcase, label: 'Expert', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const config = getExpertiseConfig(expertise);
  const Icon = config.icon;
  
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className="flex items-center space-x-1">
      <Badge variant="outline" className={`${config.color} ${textSize} flex items-center space-x-1`}>
        <Icon className={iconSize} />
        <span>{config.label}</span>
      </Badge>
      
      {verified && (
        <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
          ✓ Verified
        </Badge>
      )}
    </div>
  );
};

export default ExpertiseBadge;
