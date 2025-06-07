
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { X } from 'lucide-react';
import { CategoryType } from '@/types';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'question' | 'news';
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onOpenChange, type }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType>('legal');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'legal', label: t('legal') },
    { value: 'technology', label: t('technology') },
    { value: 'investment', label: t('investment') },
    { value: 'marketing', label: t('marketing') },
    { value: 'operations', label: t('operations') },
  ];

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error(t('userMustBeLoggedIn'));

      const { error } = await supabase
        .from('posts')
        .insert({
          type,
          title,
          content,
          category,
          tags,
          author_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: type === 'question' ? t('questionPosted') : t('newsPosted'),
        description: type === 'question' ? t('questionPostedDesc') : t('newsPostedDesc'),
      });
      resetForm();
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast({
        title: type === 'question' ? t('failedToPostQuestion') : t('failedToPostNews'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('legal');
    setTags([]);
    setNewTag('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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
    createPostMutation.mutate();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {type === 'question' ? t('askQuestion') : t('postNews')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">{t('title')}</Label>
            <Input
              id="title"
              placeholder={type === 'question' ? t('questionPlaceholder') : t('newsPlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">{t('category')}</Label>
            <Select value={category} onValueChange={(value: CategoryType) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">{t('content')}</Label>
            <Textarea
              id="content"
              placeholder={type === 'question' ? t('questionContentPlaceholder') : t('newsContentPlaceholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">{t('tags')}</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                id="tags"
                placeholder={t('addTagPlaceholder')}
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                {t('addTag')}
              </Button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Submit buttons */}
          <div className="flex space-x-2 pt-4">
            <Button 
              type="submit" 
              disabled={createPostMutation.isPending || !title.trim() || !content.trim()}
              className="flex-1"
            >
              {createPostMutation.isPending ? t('posting') : (type === 'question' ? t('postQuestion') : t('postNews'))}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
