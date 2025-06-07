
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpertiseType } from '@/types';

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
  return (
    <>
      <Input
        value={formData.name}
        onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
        className="text-2xl font-bold mb-4"
      />
      
      <div className="flex items-center space-x-4">
        <Select 
          value={formData.expertise} 
          onValueChange={(value: ExpertiseType) => onFormDataChange({ ...formData, expertise: value })}
        >
          <SelectTrigger className="w-48">
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
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="syria">Syria</SelectItem>
            <SelectItem value="international">International</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ProfileForm;
