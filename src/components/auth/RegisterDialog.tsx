
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RegisterForm from './RegisterForm';

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSwitchToLogin 
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md ${isRTL ? 'text-right' : 'text-left'}`}>
        <DialogHeader>
          <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
            {t('register')}
          </DialogTitle>
        </DialogHeader>
        
        <RegisterForm 
          onSuccess={handleSuccess}
          onSwitchToLogin={onSwitchToLogin}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
