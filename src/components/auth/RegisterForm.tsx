
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { getCountryByName } from '@/data/phoneCountries';
import DOMPurify from 'dompurify';
import RegisterFormFields from './RegisterFormFields';

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [expertiseCategory, setExpertiseCategory] = useState<string>('');
  const [expertiseSpecialization, setExpertiseSpecialization] = useState<string>('');
  const [location, setLocation] = useState<string>('Syria');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneCountryCode, setPhoneCountryCode] = useState<string>('+963');
  const [isLoading, setIsLoading] = useState(false);

  // Update phone country code when location changes
  useEffect(() => {
    const country = getCountryByName(location);
    if (country) {
      setPhoneCountryCode(country.dialCode);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name || !location || !expertiseCategory || !expertiseSpecialization) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields including your expertise category and specialization.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const sanitizedName = DOMPurify.sanitize(name);
      if (!sanitizedName) {
        toast({
          title: "Invalid name",
          description: "Please enter a valid name.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Map category to old expertise type for backwards compatibility
      const expertiseType = expertiseCategory.toLowerCase().replace(' expert', '').replace(' ', '_');
      
      await register(
        email, 
        password, 
        sanitizedName, 
        expertiseType as any, 
        location, 
        phoneNumber, 
        phoneCountryCode,
        expertiseCategory,
        expertiseSpecialization
      );
      
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully. Please check your email to confirm your account.",
      });
      
      onSuccess();
      resetForm();
    } catch (error: any) {
      console.error('Registration failed:', error);
      
      let errorMessage = "Please try again.";
      
      if (error.message?.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please try logging in instead.";
      } else if (error.message?.includes('Password should be at least 6 characters')) {
        errorMessage = "Password must be at least 6 characters long.";
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = "Please enter a valid email address.";
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setExpertiseCategory('');
    setExpertiseSpecialization('');
    setLocation('Syria');
    setPhoneNumber('');
    setPhoneCountryCode('+963');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RegisterFormFields
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        expertiseCategory={expertiseCategory}
        setExpertiseCategory={setExpertiseCategory}
        expertiseSpecialization={expertiseSpecialization}
        setExpertiseSpecialization={setExpertiseSpecialization}
        location={location}
        setLocation={setLocation}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        phoneCountryCode={phoneCountryCode}
        setPhoneCountryCode={setPhoneCountryCode}
        isLoading={isLoading}
      />
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? t('loading') : t('register')}
      </Button>

      <div className="text-center">
        <Button 
          variant="link" 
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Already have an account? {t('login')}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
