
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountrySelector } from '@/components/ui/country-selector';
import { ExpertiseType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileFormData {
  name: string;
  expertise: ExpertiseType;
  location: string; // Changed from 'syria' | 'international' to string
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
      
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start space-x-4'}`}>
        <div className={isMobile ? 'w-full' : 'w-48'}>
          <div className="text-sm text-gray-600 mb-2">Expertise</div>
          <Select 
            value={formData.expertise} 
            onValueChange={(value: ExpertiseType) => onFormDataChange({ ...formData, expertise: value })}
          >
            <SelectTrigger className="w-full">
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
        </div>
        
        <div className={isMobile ? 'w-full' : 'w-48'}>
          <div className="text-sm text-gray-600 mb-2">Country you currently live in</div>
          <CountrySelector
            value={formData.location}
            onValueChange={(value: string) => onFormDataChange({ ...formData, location: value })}
            placeholder="Select your country..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
