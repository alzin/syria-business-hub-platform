
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountrySelector } from '@/components/ui/country-selector';
import { PhoneInput } from '@/components/ui/phone-input';
import { ExpertiseType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { industrySectors, specializations } from '@/data/industrySectors';

interface ProfileFormData {
  name: string;
  expertise: ExpertiseType;
  location: string;
  phoneNumber: string;
  phoneCountryCode: string;
  specialization: string;
  industrySector: string;
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
              <SelectItem value="founder">Startup Founder</SelectItem>
              <SelectItem value="legal">Legal Expert</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
              <SelectItem value="government">Government Rep</SelectItem>
              <SelectItem value="marketing">Marketing Professional</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="researcher">Researcher</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="healthcare">Healthcare Professional</SelectItem>
              <SelectItem value="engineer">Engineer</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
              <SelectItem value="sales">Sales Professional</SelectItem>
              <SelectItem value="operations">Operations Manager</SelectItem>
              <SelectItem value="finance">Finance Professional</SelectItem>
              <SelectItem value="hr">HR Professional</SelectItem>
              <SelectItem value="student">Student</SelectItem>
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

      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-start space-x-4'}`}>
        <div className={isMobile ? 'w-full' : 'flex-1'}>
          <div className="text-sm text-gray-600 mb-2">Specialization / Major</div>
          <Select 
            value={formData.specialization} 
            onValueChange={(value: string) => onFormDataChange({ ...formData, specialization: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select specialization..." />
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className={isMobile ? 'w-full' : 'flex-1'}>
          <div className="text-sm text-gray-600 mb-2">Industry Sector</div>
          <Select 
            value={formData.industrySector} 
            onValueChange={(value: string) => onFormDataChange({ ...formData, industrySector: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select industry..." />
            </SelectTrigger>
            <SelectContent>
              {industrySectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
