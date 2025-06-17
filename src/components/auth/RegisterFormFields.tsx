
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountrySelector } from '@/components/ui/country-selector';
import { ExpertiseType } from '@/types';

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
            <SelectItem value="legal">Legal Expert</SelectItem>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="founder">Founder</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="government">Government</SelectItem>
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
    </>
  );
};

export default RegisterFormFields;
