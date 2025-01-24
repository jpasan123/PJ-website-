'use client';

import { useLanguageStore } from '@/lib/store/language';
import { getTranslation, TranslationKey } from '@/lib/i18n/translations';
import { useEffect, useState } from 'react';

export function useTranslation() {
  const { currentLanguage } = useLanguageStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    if (!mounted) {
      // Return empty string on initial render to prevent flash of translation keys
      return '';
    }

    try {
      let translation = getTranslation(key, currentLanguage.code);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          translation = translation.replace(`\${${key}}`, String(value));
        });
      }
      
      return translation;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return key;
    }
  };

  return { t, mounted };
}