
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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { X, ArrowLeft } from 'lucide-react';
import { CategoryType } from '@/types';
import CreatePostTypeSelector from '@/components/CreatePostTypeSelector';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'question' | 'news' | 'article' | 'business_idea';
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ open, onOpenChange, type: initialType }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [selectedType, setSelectedType] = useState<'question' | 'news' | 'article' | 'business_idea' | null>(initialType || null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CategoryType>('legal');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  // Business idea specific fields
  const [investmentNeeded, setInvestmentNeeded] = useState('');
  const [timeline, setTimeline] = useState('');
  const [lookingForPartners, setLookingForPartners] = useState(false);
  const [contactInfo, setContactInfo] = useState('');

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'legal', label: t('legal') },
    { value: 'technology', label: t('technology') },
    { value: 'investment', label: t('investment') },
    { value: 'marketing', label: t('marketing') },
    { value: 'operations', label: t('operations') },
  ];

  const createPostMutation = useMutation({
    mutationFn: async () => {
      if (!user || !selectedType) throw new Error(t('userMustBeLoggedIn'));

      const postData: any = {
        type: selectedType,
        title,
        content,
        category,
        tags,
        author_id: user.id,
      };

      // Add business idea specific fields
      if (selectedType === 'business_idea') {
        if (investmentNeeded) postData.investment_needed = investmentNeeded;
        if (timeline) postData.timeline = timeline;
        postData.looking_for_partners = lookingForPartners;
        if (contactInfo) postData.contact_info = contactInfo;
      }

      const { error } = await supabase
        .from('posts')
        .insert(postData);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      const successMessages = {
        question: { title: t('questionPosted'), desc: t('questionPostedDesc') },
        news: { title: t('newsPosted'), desc: t('newsPostedDesc') },
        article: { title: t('Article Published'), desc: t('Your article has been published successfully') },
        business_idea: { title: t('Business Idea Posted'), desc: t('Your business idea has been shared with the community') }
      };
      
      const message = successMessages[selectedType!];
      toast({
        title: message.title,
        description: message.desc,
      });
      resetForm();
      onOpenChange(false);
    },
    onError: (error: any) => {
      const errorMessages = {
        question: t('failedToPostQuestion'),
        news: t('failedToPostNews'),
        article: t('Failed to publish article'),
        business_idea: t('Failed to post business idea')
      };
      
      toast({
        title: errorMessages[selectedType!] || t('Failed to create post'),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSelectedType(initialType || null);
    setTitle('');
    setContent('');
    setCategory('legal');
    setTags([]);
    setNewTag('');
    setInvestmentNeeded('');
    setTimeline('');
    setLookingForPartners(false);
    setContactInfo('');
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

  const getPlaceholders = () => {
    const placeholders = {
      question: {
        title: t('questionPlaceholder'),
        content: t('questionContentPlaceholder')
      },
      news: {
        title: t('newsPlaceholder'),
        content: t('newsContentPlaceholder')
      },
      article: {
        title: t('Enter article title...'),
        content: t('Write your article content here...')
      },
      business_idea: {
        title: t('Enter your business idea title...'),
        content: t('Describe your business idea, market opportunity, and vision...')
      }
    };
    return placeholders[selectedType!] || placeholders.question;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {selectedType && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedType(null)}
                className="mr-2 p-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <span>
              {!selectedType ? t('Create New Post') : 
               selectedType === 'question' ? t('askQuestion') :
               selectedType === 'article' ? t('Write Article') :
               selectedType === 'business_idea' ? t('Propose Business Idea') :
               t('postNews')}
            </span>
          </DialogTitle>
        </DialogHeader>

        {!selectedType ? (
          <CreatePostTypeSelector 
            onSelectType={setSelectedType}
            onCancel={() => onOpenChange(false)}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">{t('title')}</Label>
              <Input
                id="title"
                placeholder={getPlaceholders().title}
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
                placeholder={getPlaceholders().content}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                required
              />
            </div>

            {/* Business Idea Specific Fields */}
            {selectedType === 'business_idea' && (
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
                  {t('Add Tag')}
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
                {createPostMutation.isPending ? t('posting') : 
                 selectedType === 'question' ? t('POST QUESTION') :
                 selectedType === 'article' ? t('Publish Article') :
                 selectedType === 'business_idea' ? t('Post Business Idea') :
                 t('postNews')}
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
