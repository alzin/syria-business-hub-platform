
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Eye, LogOut, Plus } from 'lucide-react';
import CreatePostDialog from '@/components/CreatePostDialog';
import NotificationsDropdown from '@/components/NotificationsDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserActionsProps {
  onCreateQuestion?: () => void;
  onCreateArticle?: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onCreateQuestion, onCreateArticle }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showCreatePost, setShowCreatePost] = React.useState(false);

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleViewPublicProfileClick = () => {
    navigate(`/user/${user.id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 w-full">
        {/* Create Post Button */}
        <Button
          onClick={() => setShowCreatePost(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full justify-start"
        >
          <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('createPost')}
        </Button>

        {/* User Info */}
        <div className={`flex items-center space-x-3 py-3 border-y ${isRTL ? 'space-x-reverse' : ''}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col space-y-2">
          <Button variant="ghost" onClick={handleProfileClick} className="justify-start">
            <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('profile')}
          </Button>
          <Button variant="ghost" onClick={handleViewPublicProfileClick} className="justify-start">
            <Eye className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('viewPublicProfile')}
          </Button>
          <Button variant="ghost" onClick={handleSignOut} className="justify-start text-destructive hover:text-destructive">
            <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('logout')}
          </Button>
        </div>

        <CreatePostDialog 
          open={showCreatePost} 
          onOpenChange={setShowCreatePost}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 lg:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
      {/* Create Post Button */}
      <Button
        onClick={() => setShowCreatePost(true)}
        size={isMobile ? "sm" : "default"}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <span className="hidden sm:inline">{t('createPost')}</span>
      </Button>

      {/* Notifications */}
      <NotificationsDropdown />

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span>{t('profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleViewPublicProfileClick}>
            <Eye className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span>{t('viewPublicProfile')}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreatePostDialog 
        open={showCreatePost} 
        onOpenChange={setShowCreatePost}
      />
    </div>
  );
};

export default UserActions;
