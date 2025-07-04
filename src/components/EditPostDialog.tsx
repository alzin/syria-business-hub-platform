
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import { Post, CategoryType } from '@/types';
import { CATEGORY_OPTIONS } from '@/constants/categories';

interface EditPostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
  open,
  onOpenChange,
  post,
}) => {
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
      onOpenChange(false);
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

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t('Edit Post')} - {getPostTypeLabel()}
          </DialogTitle>
        </DialogHeader>

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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="investment">{t('Investment Needed')}</Label>
                  <Input
                    id="investment"
                    placeholder={t('e.g., $50,000 - $100,000')}
                    value={investmentNeeded}
                    onChange={(e) => setInvestmentNeeded(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">{t('Timeline')}</Label>
                  <Input
                    id="timeline"
                    placeholder={t('e.g., 6-12 months')}
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="partners"
                  checked={lookingForPartners}
                  onCheckedChange={(checked) => setLookingForPartners(checked as boolean)}
                />
                <Label htmlFor="partners">{t('Looking for business partners')}</Label>
              </div>

              {lookingForPartners && (
                <div>
                  <Label htmlFor="contact">{t('Contact Information')}</Label>
                  <Input
                    id="contact"
                    placeholder={t('Email, LinkedIn, or preferred contact method')}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                  />
                </div>
              )}
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">{t('tags')}</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                type="text"
                placeholder={t('addTagPlaceholder')}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                {t('Add Tag')}
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={updatePostMutation.isPending}>
              {updatePostMutation.isPending ? t('updating') : t('Update Post')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
