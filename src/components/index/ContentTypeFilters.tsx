
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

type ContentType = 'all' | 'question' | 'article' | 'business_idea' | 'news';

interface ContentTypeFiltersProps {
  selectedContentType: ContentType;
  setSelectedContentType: (type: ContentType) => void;
}

const ContentTypeFilters: React.FC<ContentTypeFiltersProps> = ({ selectedContentType, setSelectedContentType }) => {
  const { t } = useTranslation();

  const contentTypes: { key: ContentType; label: string; color: string }[] = [
    { key: 'all', label: t('All Content'), color: 'border-gray-300' },
    { key: 'question', label: t('Questions'), color: 'border-blue-300 text-blue-700' },
    { key: 'article', label: t('Articles'), color: 'border-green-300 text-green-700' },
    { key: 'business_idea', label: t('Business Ideas'), color: 'border-purple-300 text-purple-700' },
    { key: 'news', label: t('News'), color: 'border-orange-300 text-orange-700' },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {t('Content Type')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {contentTypes.map((contentType) => (
          <Badge
            key={contentType.key}
            variant={'outline'}
            className={
              selectedContentType === contentType.key
                ? 'cursor-pointer bg-syrian-green text-white border-syrian-green hover:bg-syrian-green/90'
                : `cursor-pointer hover:bg-syrian-green/10 ${contentType.color}`
            }
            onClick={() => setSelectedContentType(contentType.key)}
          >
            {contentType.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ContentTypeFilters;
