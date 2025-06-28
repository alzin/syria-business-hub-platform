
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpertiseCategoryType, EXPERTISE_OPTIONS } from '@/types';

interface TwoStepExpertiseSelectorProps {
  category: string;
  specialization: string;
  onCategoryChange: (category: string) => void;
  onSpecializationChange: (specialization: string) => void;
  className?: string;
}

const TwoStepExpertiseSelector: React.FC<TwoStepExpertiseSelectorProps> = ({
  category,
  specialization,
  onCategoryChange,
  onSpecializationChange,
  className = ""
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const selectedCategoryData = EXPERTISE_OPTIONS.find(opt => opt.category === category);

  const handleCategoryChange = (value: string) => {
    onCategoryChange(value);
    
    // Check if the new category requires specialization
    const newCategoryData = EXPERTISE_OPTIONS.find(opt => opt.category === value);
    if (!newCategoryData?.requiresSpecialization) {
      // If specialization is not required, clear it
      onSpecializationChange('');
    } else {
      // If specialization is required and there was a previous selection, clear it
      onSpecializationChange('');
    }
  };

  const showSpecializationSelector = selectedCategoryData?.requiresSpecialization;

  return (
    <div className={`space-y-4 ${className} ${isRTL ? 'text-right' : 'text-left'}`}>
      <div>
        <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('Main Category')}
        </div>
        <Select 
          value={category} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
            <SelectValue placeholder={t('Select your main expertise category')} />
          </SelectTrigger>
          <SelectContent>
            {EXPERTISE_OPTIONS.map((option) => (
              <SelectItem 
                key={option.category} 
                value={option.category}
                className={isRTL ? 'text-right' : 'text-left'}
              >
                {t(option.category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showSpecializationSelector && selectedCategoryData && (
        <div>
          <div className={`text-sm text-gray-600 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('Specific Domain')}
          </div>
          <Select 
            value={specialization} 
            onValueChange={onSpecializationChange}
          >
            <SelectTrigger className={`w-full ${isRTL ? 'text-right' : 'text-left'}`}>
              <SelectValue placeholder={t('Select your specific domain')} />
            </SelectTrigger>
            <SelectContent>
              {selectedCategoryData.specializations.map((spec) => (
                <SelectItem 
                  key={spec} 
                  value={spec}
                  className={isRTL ? 'text-right' : 'text-left'}
                >
                  {t(spec)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TwoStepExpertiseSelector;
