import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Post, CategoryType } from '@/types';
import { CATEGORY_OPTIONS } from '@/constants/categories';
import BusinessIdeaFields from '@/components/post-creation/BusinessIdeaFields';
import TagsManager from '@/components/post-creation/TagsManager';

interface EditPostFormProps {
  post: Post;
  onSuccess: () => void;
  onCancel?: () => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ post, onSuccess, onCancel }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState<CategoryType>(post.category);
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const [tagInput, setTagInput] = useState('');
  
  // Business idea specific fields
  const [investmentNeeded, setInvestmentNeeded] = useState(post.investmentNeeded || '');
  const [timeline, setTimeline] = useState(post.timeline || '');
  const [lookingForPartners, setLookingForPartners] = useState(post.lookingForPartners || false);
  const [contactInfo, setContactInfo] = useState(post.contactInfo || '');

  const updatePostMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('userMustBeLoggedIn'));

      const updateData: any = {
        title,
        content,
        category,
        tags,
        updated_at: new Date().toISOString(),
      };

      // Add business idea specific fields
      if (post.type === 'business_idea') {
        updateData.investment_needed = investmentNeeded || null;
        updateData.timeline = timeline || null;
        updateData.looking_for_partners = lookingForPartners;
        updateData.contact_info = contactInfo || null;
      }

      const { error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', post.id)
        .eq('author_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', post.id] });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      onSuccess();
      toast({
        title: t('Your post has been updated'),
      });
    },
    onError: (error: any) => {
      toast({
        title: t('failedToUpdate', { item: t('post') }),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({
        title: t('missingInformation'),
        description: t('fillAllFields'),
        variant: "destructive",
      });
      return;
    }
    updatePostMutation.mutate();
  };

  const getPostTypeLabel = () => {
    switch (post.type) {
      case 'question': return t('Question');
      case 'article': return t('Article');
      case 'business_idea': return t('Business Idea');
      case 'news': return t('News');
      default: return t('Post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">{t('title')} *</Label>
        <Input
          id="title"
          type="text"
          placeholder={post.type === 'question' ? t('questionPlaceholder') : 
                       post.type === 'article' ? t('Enter article title...') :
                       post.type === 'business_idea' ? t('Enter your business idea title...') :
                       t('articlePlaceholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t('category')} *</Label>
        <Select value={category} onValueChange={(value: CategoryType) => setCategory(value)} required>
          <SelectTrigger>
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {t(cat.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">{t('content')} *</Label>
        <Textarea
          id="content"
          placeholder={post.type === 'question' ? t('questionContentPlaceholder') : 
                      post.type === 'article' ? t('Write your article content here...') :
                      post.type === 'business_idea' ? t('Describe your business idea, market opportunity, and vision...') :
                      t('articleContentPlaceholder')}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
        />
      </div>

      {/* Business Idea Specific Fields */}
      {post.type === 'business_idea' && (
        <BusinessIdeaFields
          investmentNeeded={investmentNeeded}
          setInvestmentNeeded={setInvestmentNeeded}
          timeline={timeline}
          setTimeline={setTimeline}
          lookingForPartners={lookingForPartners}
          setLookingForPartners={setLookingForPartners}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
        />
      )}

      <TagsManager
        tags={tags}
        setTags={setTags}
        newTag={tagInput}
        setNewTag={setTagInput}
      />

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('cancel')}
          </Button>
        )}
        <Button type="submit" disabled={updatePostMutation.isPending}>
          {updatePostMutation.isPending ? t('updating') : t('Update Post')}
        </Button>
      </div>
    </form>
  );
};

export default EditPostForm;