'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '../types';
import en from '../locales/en.json';
import es from '../locales/es.json';
import { API_URL } from '@/lib/api';

const defaultTranslations: Record<string, any> = { en, es };

export type AvailableLanguage = { code: string; name: string; isDefault?: boolean };

interface AppContextType {
  language: string;
  availableLanguages: AvailableLanguage[];
  theme: Theme;
  settings: Record<string, string>;
  setLanguage: (lang: string) => void;
  toggleTheme: () => void;
  t: (path: string) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>('en');
  const [availableLanguages, setAvailableLanguages] = useState<AvailableLanguage[]>([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
  ]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Load Settings & Languages from API
    fetch(`${API_URL}/api/settings`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { key: string; value: unknown }[]) => {
        const map = Object.fromEntries(data.map((item) => [item.key, String(item.value ?? '')]));
        setSettings(map);
      })
      .catch(() => {});

    fetch(`${API_URL}/api/languages`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.languages) {
          const enabled = data.languages.filter((l: any) => l.isEnabled);
          if (enabled.length) setAvailableLanguages(enabled);
        }
        if (data?.defaultLanguage && !localStorage.getItem('language')) {
          setLanguageState(data.defaultLanguage);
        }
      })
      .catch(() => {});

    const savedLanguage = localStorage.getItem('language');
    const savedTheme = localStorage.getItem('theme');
    if (savedLanguage) setLanguageState(savedLanguage);
    if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dataset.language = lang;
    document.documentElement.lang = lang;
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.dataset.language = language;
    root.lang = language;
  }, [language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  const t = (path: string) => {
    const keys = path.split('.');
    let value: any = defaultTranslations[language] ?? defaultTranslations.en;
    for (const key of keys) {
      if (!value || !value[key]) {
        // Fallback to English if translation key missing
        let fallback = defaultTranslations.en;
        for (const k of keys) {
          if (!fallback || !fallback[k]) return path;
          fallback = fallback[k];
        }
        return fallback;
      }
      value = value[key];
    }
    return value;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        availableLanguages,
        theme,
        settings,
        setLanguage,
        toggleTheme,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
