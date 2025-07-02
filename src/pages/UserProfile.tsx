
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import UserProfileHeader from '@/components/profile/UserProfileHeader';
import UserPostsTabs from '@/components/profile/UserPostsTabs';
import UserPublicServices from '@/components/services/UserPublicServices';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { User as UserType, Post, CategoryType } from '@/types';
import { UserService } from '@/types/services';

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const user: UserType = {
        id: data.id,
        email: data.email,
        name: data.name,
        bio: data.bio,
        expertiseCategory: data.expertise_category,
        expertiseSpecialization: data.expertise_specialization,
        location: data.location,
        accessLevel: data.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
        verified: data.verified,
        avatar: data.avatar,
        joinedAt: new Date(data.created_at),
        languages: data.languages,
      };

      return user;
    },
  });

  // Fetch user's posts
  const { data: userPosts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['user-posts', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id, name, location, access_level, verified, avatar, email, created_at, expertise_category, expertise_specialization
          )
        `)
        .eq('author_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const posts: Post[] = data.map((post: any) => ({
        id: post.id,
        type: post.type as 'question' | 'news' | 'article' | 'business_idea',
        title: post.title,
        content: post.content,
        author: {
          id: post.profiles.id,
          email: post.profiles.email,
          name: post.profiles.name,
          expertiseCategory: post.profiles.expertise_category,
          expertiseSpecialization: post.profiles.expertise_specialization,
          location: post.profiles.location,
          accessLevel: post.profiles.access_level as 'visitor' | 'registered' | 'premium' | 'verified',
          verified: post.profiles.verified,
          avatar: post.profiles.avatar,
          joinedAt: new Date(post.profiles.created_at),
        } as UserType,
        category: post.category as CategoryType,
        tags: post.tags || [],
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
        votes: post.votes,
        answers: [],
        comments: [],
        // Business idea specific fields
        investmentNeeded: post.investment_needed,
        timeline: post.timeline,
        lookingForPartners: post.looking_for_partners,
        contactInfo: post.contact_info,
      }));

      return posts;
    },
  });

  // Fetch user's public services (only active and available ones)
  const { data: userServices, isLoading: isLoadingServices } = useQuery({
    queryKey: ['user-public-services', id],
    queryFn: async () => {
      if (!id) throw new Error('User ID is required');

      const { data, error } = await supabase
        .from('user_services')
        .select('*')
        .eq('user_id', id)
        .eq('is_active', true)
        .eq('availability_status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const services: UserService[] = data?.map(service => ({
        id: service.id,
        userId: service.user_id,
        expertiseCategory: service.expertise_category,
        expertiseSpecialization: service.expertise_specialization,
        serviceTitle: service.service_title,
        serviceDescription: service.service_description,
        pricingType: service.pricing_type,
        priceRange: service.price_range,
        availabilityStatus: service.availability_status,
        deliveryTime: service.delivery_time,
        requirements: service.requirements,
        portfolioLinks: service.portfolio_links || [],
        isActive: service.is_active,
        createdAt: new Date(service.created_at),
        updatedAt: new Date(service.updated_at),
      })) || [];

      return services;
    },
  });

  const isLoading = isLoadingProfile || isLoadingPosts || isLoadingServices;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('loading')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">{t('userNotFound')}</p>
              <Button className="mt-4" onClick={() => navigate('/')}>
                {t('goBackHome')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Filter posts by type
  const questions = userPosts?.filter(post => post.type === 'question') || [];
  const news = userPosts?.filter(post => post.type === 'news') || [];
  const articles = userPosts?.filter(post => post.type === 'article') || [];
  const businessIdeas = userPosts?.filter(post => post.type === 'business_idea') || [];

  // RTL-aware styling
  const iconMargin = isRTL ? 'ml-2' : 'mr-2';
  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-6 text-sm"
        >
          <BackIcon className={`w-4 h-4 ${iconMargin}`} />
          {t('back to posts')}
        </Button>

        {/* User profile header */}
        <UserProfileHeader
          userProfile={userProfile}
          userPostsLength={userPosts?.length || 0}
          questionsLength={questions.length}
          newsLength={news.length}
          articlesLength={articles.length}
          businessIdeasLength={businessIdeas.length}
        />

        {/* User's available services */}
        {userServices && userServices.length > 0 && (
          <UserPublicServices 
            services={userServices} 
            userName={userProfile.name}
          />
        )}

        {/* User's posts */}
        <UserPostsTabs
          userProfile={userProfile}
          userPosts={userPosts}
          questions={questions}
          news={news}
          articles={articles}
          businessIdeas={businessIdeas}
        />
      </div>
    </div>
  );
};

export default UserProfile;
