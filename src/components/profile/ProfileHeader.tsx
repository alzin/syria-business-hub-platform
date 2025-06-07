
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AvatarUpload from '@/components/AvatarUpload';
import ExpertiseBadge from '@/components/ExpertiseBadge';
import { Edit2, Save, X, Mail, MapPin, Calendar } from 'lucide-react';
import { User } from '@/types';

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

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-6">
        {/* Avatar Upload Section */}
        <AvatarUpload
          currentAvatar={currentAvatar}
          userName={user.name}
          onAvatarUpdate={onAvatarUpdate}
          size="lg"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.name}
            </h1>
            {user.verified && (
              <Badge variant="secondary" className="text-blue-600">
                ✓ {t('verified')}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {isEditing ? (
              children
            ) : (
              <>
                <ExpertiseBadge expertise={user.expertise} verified={user.verified} />
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location === 'syria' ? 'Syria' : 'International'}</span>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{t('joined')} {user.joinedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2">
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
            {t('editProfile')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
