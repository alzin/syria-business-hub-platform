
import { categoriesTranslations } from './categories';
import { uiTranslations } from './ui';
import { authTranslations } from './auth';
import { postsTranslations } from './posts';
import { landingTranslations } from './landing';

export const enTranslations = {
  // App name and branding
  platformTagline: 'Where Syrian Expertise Meets Global Community',
  
  // Main tagline for posts page
  'SyrVest is where Syrian professionals meet Investors and Business owners — Ask, Share, Offer': 'SyrVest is where Syrian professionals meet Investors and Business owners — Ask, Share, Offer',

  // Spread all the modular translations
  ...categoriesTranslations,
  ...uiTranslations,
  ...authTranslations,
  ...postsTranslations,
  ...landingTranslations,
};
