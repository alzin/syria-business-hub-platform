
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { CategoryType } from '@/types';
import { CATEGORY_OPTIONS } from '@/constants/categories';

interface CategoryFiltersProps {
  selectedCategory: CategoryType | 'all';
  setSelectedCategory: (category: CategoryType | 'all') => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ selectedCategory, setSelectedCategory }) => {
  const { t } = useTranslation();

  const categories: { key: CategoryType | 'all'; labelKey: string }[] = [
    { key: 'all', labelKey: 'All Categories' },
    ...CATEGORY_OPTIONS.map(option => ({
      key: option.value,
      labelKey: option.labelKey
    }))
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {t('Filter by Category')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.key}
            variant={'outline'}
            className={
              selectedCategory === category.key
                ? 'cursor-pointer bg-syrian-green text-white border-syrian-green hover:bg-syrian-green/90'
                : 'cursor-pointer hover:bg-syrian-green/10'
            }
            onClick={() => setSelectedCategory(category.key)}
          >
            {t(category.labelKey)}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
