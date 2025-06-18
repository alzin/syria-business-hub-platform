
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountrySelector } from '@/components/ui/country-selector';
import { PhoneInput } from '@/components/ui/phone-input';
import { ExpertiseType } from '@/types';
import { industrySectors, specializations } from '@/data/industrySectors';

interface RegisterFormFieldsProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  expertise: ExpertiseType;
  setExpertise: (expertise: ExpertiseType) => void;
  location: string;
  setLocation: (location: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  phoneCountryCode: string;
  setPhoneCountryCode: (code: string) => void;
  specialization: string;
  setSpecialization: (specialization: string) => void;
  industrySector: string;
  setIndustrySector: (sector: string) => void;
  isLoading: boolean;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  expertise,
  setExpertise,
  location,
  setLocation,
  phoneNumber,
  setPhoneNumber,
  phoneCountryCode,
  setPhoneCountryCode,
  specialization,
  setSpecialization,
  industrySector,
  setIndustrySector,
  isLoading,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder={t('fullName', 'Full Name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="name"
        />
      </div>

      <div>
        <Input
          type="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="email"
        />
      </div>
      
      <div>
        <Input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          disabled={isLoading}
          autoComplete="new-password"
        />
      </div>

      <div>
        <Select 
          value={expertise} 
          onValueChange={(value: ExpertiseType) => setExpertise(value)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your expertise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="founder">Startup Founder</SelectItem>
            <SelectItem value="legal">Legal Expert</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="government">Government Representative</SelectItem>
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

      <div>
        <div className="text-sm text-gray-600 mb-2">
          Specialization / Major
        </div>
        <Select 
          value={specialization} 
          onValueChange={setSpecialization}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your specialization or major..." />
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

      <div>
        <div className="text-sm text-gray-600 mb-2">
          Industry Sector
        </div>
        <Select 
          value={industrySector} 
          onValueChange={setIndustrySector}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your industry sector..." />
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

      <div>
        <div className="text-sm text-gray-600 mb-2">
          Country you currently live in
        </div>
        <CountrySelector
          value={location}
          onValueChange={setLocation}
          placeholder="Select your country..."
          disabled={isLoading}
          className="w-full"
        />
      </div>

      <div>
        <div className="text-sm text-gray-600 mb-2">
          Phone Number
        </div>
        <PhoneInput
          value={phoneNumber}
          onValueChange={setPhoneNumber}
          countryCode={phoneCountryCode}
          onCountryCodeChange={setPhoneCountryCode}
          selectedCountry={location}
          placeholder="Enter your phone number"
          disabled={isLoading}
          className="w-full"
        />
      </div>
    </>
  );
};

export default RegisterFormFields;
