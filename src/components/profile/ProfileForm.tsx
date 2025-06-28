
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CountrySelector } from '@/components/ui/country-selector';
import { PhoneInput } from '@/components/ui/phone-input';
import TwoStepExpertiseSelector from '@/components/ui/two-step-expertise-selector';
import LanguagesSelector from '@/components/ui/languages-selector';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileFormData {
  name: string;
  bio: string;
  expertiseCategory: string;
  expertiseSpecialization: string;
  location: string;
  phoneNumber: string;
  phoneCountryCode: string;
  languages: string[];
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

      <div>
        <div className="text-sm text-gray-600 mb-2">Bio</div>
        <Textarea
          value={formData.bio}
          onChange={(e) => onFormDataChange({ ...formData, bio: e.target.value })}
          placeholder="Tell others about yourself, your background, and interests..."
          className="min-h-[100px] resize-none"
          maxLength={500}
        />
        <div className="text-xs text-gray-500 mt-1 text-right">
          {formData.bio.length}/500
        </div>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start space-x-4'}`}>
        <div className={isMobile ? 'w-full' : 'flex-1'}>
          <div className="text-sm text-gray-600 mb-2">Expertise</div>
          <TwoStepExpertiseSelector
            category={formData.expertiseCategory}
            specialization={formData.expertiseSpecialization}
            onCategoryChange={(category) => onFormDataChange({ ...formData, expertiseCategory: category })}
            onSpecializationChange={(specialization) => onFormDataChange({ ...formData, expertiseSpecialization: specialization })}
            className="w-full"
          />
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

      <div>
        <div className="text-sm text-gray-600 mb-2">Languages</div>
        <LanguagesSelector
          value={formData.languages}
          onValueChange={(languages: string[]) => onFormDataChange({ ...formData, languages })}
          placeholder="Select languages you speak..."
          className="w-full"
        />
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">Phone Number</div>
        <PhoneInput
          value={formData.phoneNumber}
          onValueChange={(value: string) => onFormDataChange({ ...formData, phoneNumber: value })}
          countryCode={formData.phoneCountryCode}
          onCountryCodeChange={(code: string) => onFormDataChange({ ...formData, phoneCountryCode: code })}
          selectedCountry={formData.location}
          placeholder="Enter your phone number"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
