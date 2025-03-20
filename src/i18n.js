import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationHR from './locales/hr.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Omogućuje automatsko prepoznavanje jezika
  .init({
    resources: {
      en: { translation: translationEN },
      hr: { translation: translationHR }
    },
    lng: 'en', // Postavi default jezik
    fallbackLng: 'en', // Ako ne prepozna jezik, koristi engleski
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
