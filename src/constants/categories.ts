
import { CategoryType } from '@/types';

export interface CategoryOption {
  value: CategoryType;
  labelKey: string; // Changed from 'label' to 'labelKey' for i18n
  color: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: 'business_idea',
    labelKey: 'Business Idea',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    value: 'business_economic',
    labelKey: 'Business & Economic',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    value: 'technology',
    labelKey: 'Technology',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    value: 'design_creative',
    labelKey: 'Design & Creative',
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  {
    value: 'marketing_sales',
    labelKey: 'Marketing & Sales',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    value: 'content_creation',
    labelKey: 'Content Creation',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  {
    value: 'languages',
    labelKey: 'Languages',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    value: 'education',
    labelKey: 'Education',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    value: 'art',
    labelKey: 'Art',
    color: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    value: 'legal',
    labelKey: 'Legal',
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  }
];

export const getCategoryOption = (category: CategoryType): CategoryOption => {
  return CATEGORY_OPTIONS.find(option => option.value === category) || CATEGORY_OPTIONS[0];
};

export const getCategoryLabelKey = (category: CategoryType): string => {
  return getCategoryOption(category).labelKey;
};

export const getCategoryColor = (category: CategoryType): string => {
  return getCategoryOption(category).color;
};
