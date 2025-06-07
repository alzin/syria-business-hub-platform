import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { ExpertiseType } from '@/types';

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
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [expertise, setExpertise] = useState<ExpertiseType>('founder');
  const [location, setLocation] = useState<'syria' | 'international'>('international');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(email, password, name, expertise, location);
      
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      
      onOpenChange(false);
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setExpertise('founder');
      setLocation('international');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('register')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder={t('fullName', 'Full Name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>

          <div>
            <Select value={expertise} onValueChange={(value: ExpertiseType) => setExpertise(value)}>
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
            <Select value={location} onValueChange={(value: 'syria' | 'international') => setLocation(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="syria">Syria</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('loading') : t('register')}
          </Button>
        </form>
        
        <div className="text-center">
          <Button variant="link" onClick={onSwitchToLogin}>
            Already have an account? {t('login')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
