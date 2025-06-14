
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Post, User, ExpertiseType, CategoryType } from '@/types';

export const usePosts = (category?: CategoryType | 'all', searchTerm?: string) => {
  return useQuery({
    queryKey: ['posts', category, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            id,
            name,
            expertise,
            location,
            access_level,
            verified,
            avatar,
            email,
            created_at
          ),
          answers (count),
          comments (count)
        `)
        .order('created_at', { ascending: false });

      // Apply category filter
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      // Apply search filter
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform the data to match our Post interface
      const posts: Post[] = data.map((post: any) => ({
        id: post.id,
        type: post.type,
        title: post.title,
        content: post.content,
        author: {
          id: post.profiles.id,
          email: post.profiles.email,
          name: post.profiles.name,
          expertise: post.profiles.expertise as ExpertiseType,
          location: post.profiles.location,
          accessLevel: post.profiles.access_level,
          verified: post.profiles.verified,
          avatar: post.profiles.avatar,
          joinedAt: new Date(post.profiles.created_at),
        } as User,
        category: post.category as CategoryType,
        tags: post.tags || [],
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
        votes: post.votes,
        answers: [], // We'll populate this when needed in individual post views
        comments: [], // We'll populate this when needed in individual post views
        answersCount: post.answers?.[0]?.count || 0,
        commentsCount: post.comments?.[0]?.count || 0,
        // Business idea specific fields
        investmentNeeded: post.investment_needed,
        timeline: post.timeline,
        lookingForPartners: post.looking_for_partners,
        contactInfo: post.contact_info,
      }));

      return posts;
    },
  });
};
