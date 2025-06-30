
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PasswordResetForm from './PasswordResetForm';

interface PasswordResetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin: () => void;
}

const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({ 
  open, 
  onOpenChange, 
  onBackToLogin 
}) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        
        <PasswordResetForm 
          onSuccess={handleSuccess}
          onBackToLogin={onBackToLogin}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetDialog;
