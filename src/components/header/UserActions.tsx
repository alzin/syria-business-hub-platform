
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, MessageSquare, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserActionsProps {
  onCreateQuestion: () => void;
  onCreateArticle: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onCreateQuestion, onCreateArticle }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="default"
        size="sm"
        onClick={onCreateQuestion}
        className="flex items-center space-x-1 bg-gradient-energy hover:opacity-90"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">{t('askQuestion', 'Ask Question')}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onCreateArticle}
        className="flex items-center space-x-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">{t('postArticle', 'Post Article')}</span>
      </Button>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 cursor-pointer" onClick={() => navigate('/profile')}>
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{user.name}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/profile')}
          className="text-muted-foreground hover:text-foreground"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default UserActions;
