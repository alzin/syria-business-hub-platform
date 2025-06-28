
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import LanguageToggle from '@/components/LanguageToggle';
import LoginDialog from '@/components/auth/LoginDialog';
import RegisterDialog from '@/components/auth/RegisterDialog';
import Logo from '@/components/Logo';
import SearchBar from '@/components/header/SearchBar';
import UserActions from '@/components/header/UserActions';
import AuthButtons from '@/components/header/AuthButtons';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu, X, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface HeaderProps {
  onSearch?: (term: string) => void;
  searchTerm?: string;
  onCreatePost?: () => void;
  showCreateButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchTerm = '', onCreatePost, showCreateButton = false }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const MobileActions = () => (
    <div className="flex flex-col space-y-4 p-4">
      <LanguageToggle />
      {user ? (
        <UserActions />
      ) : (
        <AuthButtons 
          onLogin={() => {
            setShowLogin(true);
            setMobileMenuOpen(false);
          }}
          onRegister={() => {
            setShowRegister(true);
            setMobileMenuOpen(false);
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Logo className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32" />
            </div>

            {/* Desktop Search Bar */}
            {onSearch && !isMobile && (
              <div className="hidden md:block flex-1 max-w-md mx-8">
                <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
              </div>
            )}

            {/* Desktop Actions */}
            {!isMobile && (
              <div className="flex items-center space-x-4">
                <LanguageToggle />
                {user ? (
                  <UserActions />
                ) : (
                  <AuthButtons 
                    onLogin={() => setShowLogin(true)}
                    onRegister={() => setShowRegister(true)}
                  />
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <MobileActions />
                </SheetContent>
              </Sheet>
            )}
          </div>

          {/* Mobile Search Bar with Create Button */}
          {onSearch && isMobile && (
            <div className="pb-3 pt-1 flex items-center gap-2">
              <div className="flex-1">
                <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
              </div>
              {showCreateButton && onCreatePost && (
                <Button
                  onClick={onCreatePost}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 w-10 rounded-full p-0"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Dialogs */}
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToRegister={handleSwitchToRegister}
      />

      <RegisterDialog
        open={showRegister}
        onOpenChange={setShowRegister}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default Header;
