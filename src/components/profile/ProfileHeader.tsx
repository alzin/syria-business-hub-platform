
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AvatarUpload from '@/components/AvatarUpload';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Edit2, Save, X, Mail, MapPin, Calendar } from 'lucide-react';
import { User } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileHeaderProps {
  user: User;
  currentAvatar: string | null;
  isEditing: boolean;
  isLoading: boolean;
  onAvatarUpdate: (avatarUrl: string | null) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode; // For the form fields when editing
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  currentAvatar,
  isEditing,
  isLoading,
  onAvatarUpdate,
  onEdit,
  onSave,
  onCancel,
  children
}) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'w-full' : 'flex items-start justify-between'}`}>
      <div className={`${isMobile ? 'w-full space-y-4' : 'flex items-start space-x-4 lg:space-x-6 flex-1'}`}>
        {/* Avatar Upload Section - responsive */}
        <div className={`${isMobile ? 'flex justify-center' : 'flex-shrink-0'}`}>
          <AvatarUpload
            currentAvatar={currentAvatar}
            userName={user.name}
            onAvatarUpdate={onAvatarUpdate}
            size={isMobile ? "md" : "lg"}
          />
        </div>
        
        <div className={`${isMobile ? 'w-full text-center' : 'flex-1 min-w-0'}`}>
          {/* Name and verification badge - responsive */}
          <div className={`${isMobile ? 'flex flex-col items-center space-y-2 mb-3' : 'flex items-center space-x-3 mb-2'}`}>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
              {user.name}
            </h1>
            {user.verified && (
              <Badge variant="secondary" className={`text-blue-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                ✓ {t('verified')}
              </Badge>
            )}
          </div>
          
          {/* Expertise and location info - responsive layout */}
          <div className={`${isMobile ? 'flex flex-col items-center space-y-2 mb-4' : 'flex items-center space-x-4 mb-4'}`}>
            {isEditing ? (
              <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                {children}
              </div>
            ) : (
              <>
                <ExpertiseBadge expertise={user.expertise} verified={user.verified} />
                <div className={`flex items-center space-x-1 ${isMobile ? 'text-sm' : 'text-base'} text-gray-500`}>
                  <MapPin className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  <span>{user.location === 'syria' ? 'Syria' : 'International'}</span>
                </div>
              </>
            )}
          </div>

          {/* Contact info - responsive */}
          <div className={`${isMobile ? 'flex flex-col items-center space-y-2' : 'flex items-center space-x-6'} ${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
            <div className="flex items-center space-x-1">
              <Mail className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span className={`${isMobile ? 'break-all' : ''}`}>{user.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span>{t('joined')} {user.joinedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons - only show on desktop, mobile version is in parent component */}
      {!isMobile && (
        <div className="flex items-center space-x-2 flex-shrink-0">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isLoading}
              >
                <X className="w-4 h-4 mr-2" />
                {t('cancel')}
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? t('saving') : t('save')}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              {t('edit profile')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
