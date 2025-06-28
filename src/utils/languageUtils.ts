
export const formatLanguagesList = (languages: string[] | null | undefined): string => {
  if (!languages || !Array.isArray(languages) || languages.length === 0) {
    return '';
  }

  if (languages.length === 1) {
    return languages[0];
  }

  if (languages.length === 2) {
    return languages.join(' & ');
  }

  const lastLanguage = languages[languages.length - 1];
  const otherLanguages = languages.slice(0, -1);
  return `${otherLanguages.join(', ')} & ${lastLanguage}`;
};

export const getLanguageDisplayText = (languages: string[] | null | undefined): string => {
  if (!languages || !Array.isArray(languages) || languages.length === 0) {
    return 'No languages specified';
  }

  return formatLanguagesList(languages);
};
