
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpertiseCategoryType, EXPERTISE_OPTIONS } from '@/types';

interface TwoStepExpertiseSelectorProps {
  category: string;
  specialization: string;
  onCategoryChange: (category: string) => void;
  onSpecializationChange: (specialization: string) => void;
  disabled?: boolean;
  className?: string;
}

const TwoStepExpertiseSelector: React.FC<TwoStepExpertiseSelectorProps> = ({
  category,
  specialization,
  onCategoryChange,
  onSpecializationChange,
  disabled = false,
  className = ""
}) => {
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
    <div className={`space-y-4 ${className}`}>
      <div>
        <div className="text-sm text-gray-600 mb-2">Main Category</div>
        <Select 
          value={category} 
          onValueChange={handleCategoryChange}
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your main expertise category" />
          </SelectTrigger>
          <SelectContent>
            {EXPERTISE_OPTIONS.map((option) => (
              <SelectItem key={option.category} value={option.category}>
                {option.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showSpecializationSelector && selectedCategoryData && (
        <div>
          <div className="text-sm text-gray-600 mb-2">Specific Domain</div>
          <Select 
            value={specialization} 
            onValueChange={onSpecializationChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your specific domain" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategoryData.specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
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
