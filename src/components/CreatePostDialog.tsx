
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { CategoryType } from '@/types';
import CreatePostTypeSelector from '@/components/CreatePostTypeSelector';
import PostFormFields from '@/components/post-creation/PostFormFields';
import BusinessIdeaFields from '@/components/post-creation/BusinessIdeaFields';
import TagsManager from '@/components/post-creation/TagsManager';

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

  const getDialogTitle = () => {
    if (!selectedType) return t('Create New Post');
    
    const titles = {
      question: t('askQuestion'),
      article: t('Write Article'),
      business_idea: t('Propose Business Idea'),
      news: t('postNews')
    };
    
    return titles[selectedType];
  };

  const getSubmitButtonText = () => {
    if (createPostMutation.isPending) return t('posting');
    
    const buttonTexts = {
      question: t('POST QUESTION'),
      article: t('Publish Article'),
      business_idea: t('Post Business Idea'),
      news: t('postNews')
    };
    
    return buttonTexts[selectedType!];
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
            <span>{getDialogTitle()}</span>
          </DialogTitle>
        </DialogHeader>

        {!selectedType ? (
          <CreatePostTypeSelector 
            onSelectType={setSelectedType}
            onCancel={() => onOpenChange(false)}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <PostFormFields
              postType={selectedType}
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              category={category}
              setCategory={setCategory}
            />

            {/* Business Idea Specific Fields */}
            {selectedType === 'business_idea' && (
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
              newTag={newTag}
              setNewTag={setNewTag}
            />

            {/* Submit buttons */}
            <div className="flex space-x-2 pt-4">
              <Button 
                type="submit" 
                disabled={createPostMutation.isPending || !title.trim() || !content.trim()}
                className="flex-1"
              >
                {getSubmitButtonText()}
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
