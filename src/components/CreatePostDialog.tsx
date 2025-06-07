
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { CategoryType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';

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
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

      const { error } = await supabase
        .from('posts')
        .insert({
          type,
          title,
          content,
          author_id: user.id,
          category,
          tags: tagsArray,
        });

      if (error) throw error;

      toast({
        title: `${type === 'question' ? 'Question' : 'News'} posted!`,
        description: "Your post has been published successfully.",
      });

      // Refresh posts
      queryClient.invalidateQueries({ queryKey: ['posts'] });

      onOpenChange(false);
      setTitle('');
      setContent('');
      setTags('');
    } catch (error: any) {
      toast({
        title: "Failed to create post",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {type === 'question' ? t('askQuestion') : t('postNews')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div>
            <Select value={category} onValueChange={(value: CategoryType) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">{t('legal')}</SelectItem>
                <SelectItem value="technology">{t('technology')}</SelectItem>
                <SelectItem value="investment">{t('investment')}</SelectItem>
                <SelectItem value="marketing">{t('marketing')}</SelectItem>
                <SelectItem value="operations">{t('operations')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t('loading') : t('submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
