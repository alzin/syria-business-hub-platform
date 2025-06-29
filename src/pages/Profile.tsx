
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import ProfileActions from '@/components/profile/ProfileActions';
import ProfileContent from '@/components/profile/ProfileContent';
import ProfileNotLoggedIn from '@/components/profile/ProfileNotLoggedIn';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

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

const Profile = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user?.avatar || null);
  
  // Form state
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    bio: user?.bio || '',
    expertiseCategory: user?.expertiseCategory || '',
    expertiseSpecialization: user?.expertiseSpecialization || '',
    location: user?.location || 'Syria',
    phoneNumber: user?.phoneNumber || '',
    phoneCountryCode: user?.phoneCountryCode || '+963',
    languages: user?.languages || [],
  });

  if (!user) {
    return <ProfileNotLoggedIn onGoHome={() => navigate('/')} />;
  }

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          bio: formData.bio,
          expertise_category: formData.expertiseCategory,
          expertise_specialization: formData.expertiseSpecialization,
          location: formData.location,
          phone_number: formData.phoneNumber,
          phone_country_code: formData.phoneCountryCode,
          languages: formData.languages,
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
      bio: user.bio || '',
      expertiseCategory: user.expertiseCategory || '',
      expertiseSpecialization: user.expertiseSpecialization || '',
      location: user.location,
      phoneNumber: user.phoneNumber || '',
      phoneCountryCode: user.phoneCountryCode || '+963',
      languages: user.languages || [],
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
        <ProfileActions
          onBackClick={() => navigate('/')}
          onViewPublicProfile={handleViewPublicProfile}
        />

        <ProfileContent
          user={user}
          currentAvatar={currentAvatar}
          isEditing={isEditing}
          isLoading={isLoading}
          formData={formData}
          onAvatarUpdate={handleAvatarUpdate}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
          onFormDataChange={setFormData}
        />

        {/* Additional profile sections can be added here */}
        {/* Future: Activity, Posts, Settings, etc. */}
      </div>
    </div>
  );
};

export default Profile;
