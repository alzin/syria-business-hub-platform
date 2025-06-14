
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategoryType } from '@/types';

interface PostFormFieldsProps {
  postType: 'question' | 'news' | 'article' | 'business_idea';
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  category: CategoryType;
  setCategory: (category: CategoryType) => void;
}

const PostFormFields: React.FC<PostFormFieldsProps> = ({
  postType,
  title,
  setTitle,
  content,
  setContent,
  category,
  setCategory,
}) => {
  const { t } = useTranslation();

  const categories: { value: CategoryType; label: string }[] = [
    { value: 'legal', label: t('legal') },
    { value: 'technology', label: t('technology') },
    { value: 'investment', label: t('investment') },
    { value: 'marketing', label: t('marketing') },
    { value: 'operations', label: t('operations') },
  ];

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
    return placeholders[postType] || placeholders.question;
  };

  return (
    <>
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
    </>
  );
};

export default PostFormFields;
