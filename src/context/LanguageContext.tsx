import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { translations, Translations } from '../translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('divesafe_lang') as SupportedLanguage;
      if (saved && (saved === 'en' || saved === 'ru' || saved === 'he')) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  const isRtl = language === 'he';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem('divesafe_lang', language);
    } catch (e) {
      console.error(e);
    }
  }, [language, isRtl]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRtl
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
