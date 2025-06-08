
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpertiseType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileFormData {
  name: string;
  expertise: ExpertiseType;
  location: 'syria' | 'international';
}

interface ProfileFormProps {
  formData: ProfileFormData;
  onFormDataChange: (data: ProfileFormData) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, onFormDataChange }) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <Input
        value={formData.name}
        onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
        className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'} mb-4`}
        placeholder="Enter your name"
      />
      
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-4'}`}>
        <Select 
          value={formData.expertise} 
          onValueChange={(value: ExpertiseType) => onFormDataChange({ ...formData, expertise: value })}
        >
          <SelectTrigger className={isMobile ? 'w-full' : 'w-48'}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="legal">Legal Expert</SelectItem>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="founder">Startup Founder</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="government">Government Rep</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={formData.location} 
          onValueChange={(value: 'syria' | 'international') => onFormDataChange({ ...formData, location: value })}
        >
          <SelectTrigger className={isMobile ? 'w-full' : 'w-48'}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="syria">Syria</SelectItem>
            <SelectItem value="international">International</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProfileForm;
