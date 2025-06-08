
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { User, Settings, LogOut, Plus } from 'lucide-react';
import CreatePostDialog from '@/components/CreatePostDialog';
import NotificationsDropdown from '@/components/NotificationsDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserActionsProps {
  onCreateQuestion: () => void;
  onCreateArticle: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onCreateQuestion, onCreateArticle }) => {
  const { user, logout } = useAuth();
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
    navigate(`/user/${user.id}`);
  };

  const handleSettingsClick = () => {
    navigate('/profile');
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
          onClick={onCreateQuestion}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full justify-start"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>

        {/* User Info */}
        <div className="flex items-center space-x-3 py-3 border-y">
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
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" onClick={handleSettingsClick} className="justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" onClick={handleSignOut} className="justify-start text-destructive hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>

        <CreatePostDialog 
          open={showCreatePost} 
          onOpenChange={setShowCreatePost}
          type="question"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 lg:space-x-4">
      {/* Create Post Button */}
      <Button
        onClick={onCreateQuestion}
        size={isMobile ? "sm" : "default"}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Create Post</span>
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
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreatePostDialog 
        open={showCreatePost} 
        onOpenChange={setShowCreatePost}
        type="question"
      />
    </div>
  );
};

export default UserActions;
