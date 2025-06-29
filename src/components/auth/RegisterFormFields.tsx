
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { CountrySelector } from '@/components/ui/country-selector';
import { PhoneInput } from '@/components/ui/phone-input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import TwoStepExpertiseSelector from '@/components/ui/two-step-expertise-selector';

interface RegisterFormFieldsProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  expertiseCategory: string;
  setExpertiseCategory: (category: string) => void;
  expertiseSpecialization: string;
  setExpertiseSpecialization: (specialization: string) => void;
  location: string;
  setLocation: (location: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  phoneCountryCode: string;
  setPhoneCountryCode: (code: string) => void;
  isLoading: boolean;
}

const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  expertiseCategory,
  setExpertiseCategory,
  expertiseSpecialization,
  setExpertiseSpecialization,
  location,
  setLocation,
  phoneNumber,
  setPhoneNumber,
  phoneCountryCode,
  setPhoneCountryCode,
  isLoading,
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div>
        <Input
          type="text"
          placeholder={t('fullName', 'Full Name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          autoComplete="name"
          className={isRTL ? 'text-right' : 'text-left'}
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
          className={isRTL ? 'text-right' : 'text-left'}
        />
      </div>
      
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          disabled={isLoading}
          autoComplete="new-password"
          className={`${isRTL ? 'text-right pr-10' : 'text-left pr-10'}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`absolute top-0 h-full px-3 py-2 hover:bg-transparent ${
            isRTL ? 'left-0' : 'right-0'
          }`}
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div>
        <TwoStepExpertiseSelector
          category={expertiseCategory}
          specialization={expertiseSpecialization}
          onCategoryChange={setExpertiseCategory}
          onSpecializationChange={setExpertiseSpecialization}
          disabled={isLoading}
          className="w-full"
        />
      </div>

      <div>
        <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
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
        <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          Phone Number *
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
          required
        />
      </div>
    </div>
  );
};

export default RegisterFormFields;
