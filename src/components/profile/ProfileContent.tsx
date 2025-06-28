
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import { Edit2, Save, X } from 'lucide-react';
import { User } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileFormData {
  name: string;
  bio: string;
  expertiseCategory: string;
  expertiseSpecialization: string;
  location: string;
  phoneNumber: string;
  phoneCountryCode: string;
  languages: string[];
}

interface ProfileContentProps {
  user: User;
  currentAvatar: string | null;
  isEditing: boolean;
  isLoading: boolean;
  formData: ProfileFormData;
  onAvatarUpdate: (avatarUrl: string | null) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFormDataChange: (data: ProfileFormData) => void;
}

const ProfileContent: React.FC<ProfileContentProps> = ({
  user,
  currentAvatar,
  isEditing,
  isLoading,
  formData,
  onAvatarUpdate,
  onEdit,
  onSave,
  onCancel,
  onFormDataChange
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Card className="mb-6 sm:mb-8">
      <CardHeader className="p-3 sm:p-4 lg:p-6">
        <ProfileHeader
          user={user}
          currentAvatar={currentAvatar}
          isEditing={isEditing}
          isLoading={isLoading}
          onAvatarUpdate={onAvatarUpdate}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
        >
          {/* Form content when editing - responsive */}
          <div className={`${isMobile ? 'w-full' : 'max-w-md'}`}>
            <ProfileForm
              formData={formData}
              onFormDataChange={onFormDataChange}
            />
          </div>
        </ProfileHeader>

        {/* Mobile action buttons */}
        {isMobile && (
          <div className={`flex justify-center space-x-2 mt-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="text-xs"
                >
                  <X className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {t('cancel')}
                </Button>
                <Button
                  size="sm"
                  onClick={onSave}
                  disabled={isLoading}
                  className="text-xs"
                >
                  <Save className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                  {isLoading ? t('saving') : t('save')}
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="text-xs"
              >
                <Edit2 className={`w-3 h-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                {t('edit profile')}
              </Button>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProfileContent;
