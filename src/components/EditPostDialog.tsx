
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Post } from '@/types';
import EditPostForm from '@/components/EditPostForm';

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

  const getPostTypeLabel = () => {
    switch (post.type) {
      case 'question': return t('Question');
      case 'article': return t('Article');
      case 'business_idea': return t('Business Idea');
      case 'news': return t('News');
      default: return t('Post');
    }
  };

  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t('Edit Post')} - {getPostTypeLabel()}
          </DialogTitle>
        </DialogHeader>

        <EditPostForm post={post} onSuccess={handleSuccess} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;