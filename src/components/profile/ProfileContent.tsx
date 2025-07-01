
import React, { useState } from 'react';
import { User } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import UserPostsTabs from './UserPostsTabs';
import ServicesManager from '@/components/services/ServicesManager';

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
  onFormDataChange,
}) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ProfileHeader
        user={user}
        currentAvatar={currentAvatar}
        isEditing={isEditing}
        onAvatarUpdate={onAvatarUpdate}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        isLoading={isLoading}
      />

      <div className="px-3 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6 pb-6">
            {isEditing ? (
              <ProfileForm
                formData={formData}
                onFormDataChange={onFormDataChange}
              />
            ) : (
              <div className="space-y-6">
                {/* Bio Section */}
                {user.bio && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="text-sm text-gray-900">{user.location}</dd>
                      </div>
                      {user.phoneNumber && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Phone</dt>
                          <dd className="text-sm text-gray-900">
                            {user.phoneCountryCode} {user.phoneNumber}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {/* Expertise */}
                  {(user.expertiseCategory || user.expertiseSpecialization) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Expertise</h3>
                      <dl className="space-y-2">
                        {user.expertiseCategory && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Category</dt>
                            <dd className="text-sm text-gray-900">{user.expertiseCategory}</dd>
                          </div>
                        )}
                        {user.expertiseSpecialization && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Specialization</dt>
                            <dd className="text-sm text-gray-900">{user.expertiseSpecialization}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}
                </div>

                {/* Languages */}
                {user.languages && user.languages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.languages.map((language, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="services" className="mt-6 pb-6">
            <ServicesManager userId={user.id} isOwner={true} />
          </TabsContent>
          
          <TabsContent value="posts" className="mt-6 pb-6">
            <UserPostsTabs userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileContent;
