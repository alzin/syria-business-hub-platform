
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Camera, Upload, User } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatar?: string;
  userName: string;
  onAvatarUpdate: (avatarUrl: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ 
  currentAvatar, 
  userName, 
  onAvatarUpdate,
  size = 'lg'
}) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Clean up old preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      onAvatarUpdate(publicUrl);
      setPreviewUrl(null);

      toast({
        title: "Avatar updated",
        description: "Your profile photo has been updated successfully.",
      });

    } catch (error: any) {
      console.error('Avatar upload error:', error);
      
      // Clean up preview URL on error
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }

      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || !currentAvatar) return;

    setIsUploading(true);

    try {
      // Update profile to remove avatar
      const { error } = await supabase
        .from('profiles')
        .update({ avatar: null })
        .eq('id', user.id);

      if (error) throw error;

      onAvatarUpdate(null);

      toast({
        title: "Avatar removed",
        description: "Your profile photo has been removed.",
      });

    } catch (error: any) {
      console.error('Avatar removal error:', error);
      toast({
        title: "Removal failed",
        description: error.message || "Failed to remove avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const displayAvatar = previewUrl || currentAvatar;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <Avatar className={`${sizeClasses[size]} border-4 border-white shadow-lg`}>
          {displayAvatar ? (
            <AvatarImage src={displayAvatar} alt={userName} />
          ) : (
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <User className={size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12'} />
            </AvatarFallback>
          )}
        </Avatar>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload">
            <Button
              variant="outline"
              size="sm"
              disabled={isUploading}
              asChild
            >
              <span className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </span>
            </Button>
          </label>
          
          {currentAvatar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveAvatar}
              disabled={isUploading}
            >
              Remove
            </Button>
          )}
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          PNG, JPG up to 5MB
        </p>
      </div>
    </div>
  );
};

export default AvatarUpload;
