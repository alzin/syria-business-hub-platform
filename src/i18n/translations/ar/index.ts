
import { categoriesTranslations } from './categories';
import { uiTranslations } from './ui';
import { authTranslations } from './auth';
import { postsTranslations } from './posts';
import { landingTranslations } from './landing';

export const arTranslations = {
  // App name and branding
  appName: 'سير فيست',
  platformTagline: 'حيث تلتقي الخبرة السورية بالمجتمع العالمي',

  // Main tagline for posts page
  'SyrVest is where Syrian professionals meet Investors and Business owners — Ask, Share, Offer': 'المنصة التي يلتقي فيها المهنيون السوريون بالمستثمرين وأصحاب العمل اسأل، شارك، اعرض',

  // Spread all the modular translations
  ...categoriesTranslations,
  ...uiTranslations,
  ...authTranslations,
  ...postsTranslations,
  ...landingTranslations,
};
