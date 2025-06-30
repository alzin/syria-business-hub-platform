
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface PasswordResetFormProps {
  onSuccess: () => void;
  onBackToLogin: () => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSuccess, onBackToLogin }) => {
  const { t } = useTranslation();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      
      toast({
        title: "Password reset email sent",
        description: "Please check your email for instructions to reset your password.",
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Password reset failed:', error);
      
      let errorMessage = "Please try again.";
      
      if (error.message?.includes('User not found')) {
        errorMessage = "No account found with this email address.";
      } else if (error.message?.includes('Too many requests')) {
        errorMessage = "Too many requests. Please wait a moment before trying again.";
      }
      
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t('loading') : 'Send Reset Email'}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <Button 
          variant="link" 
          onClick={onBackToLogin}
          disabled={isLoading}
        >
          Back to {t('login')}
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetForm;
