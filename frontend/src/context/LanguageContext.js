import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    appTitle: 'Krishi Sahayak',
    home: 'Home',
    crops: 'Crops',
    community: 'Community',
    mandi: 'Mandi Prices',
    askQuestion: 'Ask your farming question',
    submit: 'Submit',
  },
  hi: {
    appTitle: 'कृषि सहायक',
    home: 'होम',
    crops: 'फसलें',
    community: 'समुदाय',
    mandi: 'मंडी भाव',
    askQuestion: 'अपना सवाल पूछें',
    submit: 'जमा करें',
  },
  mr: {
    appTitle: 'कृषी सहाय्यक',
    home: 'मुख्यपृष्ठ',
    crops: 'पिके',
    community: 'समुदाय',
    mandi: 'मंडी दर',
    askQuestion: 'तुमचा प्रश्न विचारा',
    submit: 'सबमिट करा',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
