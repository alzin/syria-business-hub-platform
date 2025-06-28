
// Language utility functions for consistent language handling

export const LANGUAGES = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ku', name: 'Kurdish', nativeName: 'کوردی' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
];

export const getLanguageByCode = (code: string) => {
  return LANGUAGES.find(lang => lang.code === code);
};

export const getLanguageNames = (codes: string[]): string[] => {
  return codes.map(code => {
    const language = getLanguageByCode(code);
    return language ? language.name : code;
  }).filter(Boolean);
};

export const formatLanguagesForDisplay = (codes: string[], showNative = false): string => {
  const languages = codes.map(code => {
    const language = getLanguageByCode(code);
    if (!language) return code;
    return showNative ? language.nativeName : language.name;
  }).filter(Boolean);
  
  return languages.join(', ');
};
