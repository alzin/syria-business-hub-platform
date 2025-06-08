
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Eye } from 'lucide-react';
import { ExpertiseType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

const Profile = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    expertise: user?.expertise || 'founder' as ExpertiseType,
    location: user?.location || 'international' as 'syria' | 'international',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <Card>
            <CardContent className="text-center py-8 sm:py-12">
              <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('userMustBeLoggedIn')}</p>
              <Button onClick={() => navigate('/')} size={isMobile ? "sm" : "default"}>
                {t('goBackHome')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          expertise: formData.expertise,
          location: formData.location,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: t('profileUpdated'),
        description: t('profileUpdatedDesc'),
      });

      setIsEditing(false);
      // Refresh the page to get updated user data
      window.location.reload();
    } catch (error: any) {
      toast({
        title: t('failedToUpdate', { item: t('profile') }),
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      expertise: user.expertise,
      location: user.location,
    });
    setIsEditing(false);
  };

  const handleAvatarUpdate = (avatarUrl: string | null) => {
    setCurrentAvatar(avatarUrl);
  };

  const handleViewPublicProfile = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header with back button and view public profile button */}
        <div className={`${isMobile ? 'flex flex-col space-y-3' : 'flex items-center justify-between'} mb-4 sm:mb-6`}>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="p-2 sm:p-3"
            size={isMobile ? "sm" : "default"}
          >
            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">{t('back to posts')}</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleViewPublicProfile}
            size={isMobile ? "sm" : "default"}
            className={isMobile ? 'w-full' : ''}
          >
            <Eye className="w-4 h-4 mr-2" />
            <span className="text-sm sm:text-base">View Public Profile</span>
          </Button>
        </div>

        {/* Profile Header Card - responsive padding */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <div className={`${isMobile ? 'space-y-4' : 'flex items-start justify-between'}`}>
              {/* Avatar and basic info - responsive layout */}
              <div className={`${isMobile ? 'flex flex-col items-center text-center space-y-4' : 'flex items-start space-x-4 lg:space-x-6'}`}>
                {/* Avatar Upload Section - responsive size */}
                <div className="flex-shrink-0">
                  <ProfileHeader
                    user={user}
                    currentAvatar={currentAvatar}
                    isEditing={isEditing}
                    isLoading={isLoading}
                    onAvatarUpdate={handleAvatarUpdate}
                    onEdit={() => setIsEditing(true)}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  >
                    {/* Form content when editing - responsive */}
                    <div className={`${isMobile ? 'w-full' : 'max-w-md'}`}>
                      <ProfileForm
                        formData={formData}
                        onFormDataChange={setFormData}
                      />
                    </div>
                  </ProfileHeader>
                </div>
              </div>

              {/* Action buttons - responsive positioning */}
              {isMobile && (
                <div className="flex justify-center space-x-2 mt-4">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="text-xs"
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isLoading}
                        className="text-xs"
                      >
                        {isLoading ? t('saving') : t('save')}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      className="text-xs"
                    >
                      {t('edit profile')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Additional profile sections can be added here */}
        {/* Future: Activity, Posts, Settings, etc. */}
      </div>
    </div>
  );
};

export default Profile;
