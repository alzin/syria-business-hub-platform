
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileForm from '@/components/profile/ProfileForm';
import AccountInfo from '@/components/profile/AccountInfo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { ExpertiseType } from '@/types';

const Profile = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('userMustBeLoggedIn')}</p>
              <Button className="mt-4" onClick={() => navigate('/')}>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backToHome')}
        </Button>

        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
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
              <ProfileForm
                formData={formData}
                onFormDataChange={setFormData}
              />
            </ProfileHeader>
          </CardHeader>
        </Card>

        {/* Account Information */}
        <AccountInfo user={user} />
      </div>
    </div>
  );
};

export default Profile;
