import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Theme } from '../types';
import en from '../locales/en.json';
import es from '../locales/es.json';

const translations: Record<Language, any> = { en, es };

interface AppContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  t: (path: string) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'es' ? saved : 'en') as Language;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light' ? saved : 'dark') as Theme;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const t = (path: string) => {
    const keys = path.split('.');
    let value: any = translations[language];
    for (const key of keys) {
      if (!value || !value[key]) return path;
      value = value[key];
    }
    return value;
  };

  return (
    <AppContext.Provider value={{ language, theme, setLanguage, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
