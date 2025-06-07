
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  onLogin: () => void;
  onRegister: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onLogin, onRegister }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogin}
      >
        {t('login')}
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={onRegister}
      >
        {t('register')}
      </Button>
    </div>
  );
};

export default AuthButtons;
