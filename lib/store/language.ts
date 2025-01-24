'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = {
  code: keyof typeof import('@/lib/i18n/translations').translations;
  name: string;
  nativeName: string;
  flag: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇱🇰' }
];

interface LanguageState {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: languages[0],
      setLanguage: (language) => set({ currentLanguage: language })
    }),
    {
      name: 'language-storage',
      skipHydration: true
    }
  )
);

if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('language-storage');
  if (savedLanguage) {
    try {
      const { state } = JSON.parse(savedLanguage);
      const language = languages.find(lang => lang.code === state.currentLanguage.code);
      if (language) {
        useLanguageStore.setState({ currentLanguage: language });
      }
    } catch (error) {
      console.error('Error initializing language store:', error);
    }
  }
}