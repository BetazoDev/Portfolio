export type Language = 'en' | 'es';
export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  description: {
    en: string;
    es: string;
  };
  stack: string[];
  link: string;
  github: string;
  image?: string;
}

export interface SkillGroup {
  id: string;
  category: {
    en: string;
    es: string;
  };
  items: string[];
}

export interface Experience {
  id: string;
  timeframe: string;
  company: string;
  role: {
    en: string;
    es: string;
  };
  details: {
    en: string[];
    es: string[];
  };
}
