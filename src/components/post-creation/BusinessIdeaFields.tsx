
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface BusinessIdeaFieldsProps {
  investmentNeeded: string;
  setInvestmentNeeded: (value: string) => void;
  timeline: string;
  setTimeline: (value: string) => void;
  lookingForPartners: boolean;
  setLookingForPartners: (value: boolean) => void;
  contactInfo: string;
  setContactInfo: (value: string) => void;
}

const BusinessIdeaFields: React.FC<BusinessIdeaFieldsProps> = ({
  investmentNeeded,
  setInvestmentNeeded,
  timeline,
  setTimeline,
  lookingForPartners,
  setLookingForPartners,
  contactInfo,
  setContactInfo,
}) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default BusinessIdeaFields;
