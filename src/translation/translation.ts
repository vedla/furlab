import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/translation/en.json';
import es from '@/translation/es.json';

const resources = {
  en: en,
  es: es,
};

const translation = new I18n({
  en: en,
  es: es,
});

// const fallbackLng = 'en';

type LanguageCode = keyof typeof resources;

// const i18n = init18n({ resources, fallbackLng });
translation.locale = getLocales()[0].languageCode;

const t = translation.t.bind(translation);

// Removed default export to avoid circular definition

export { t, resources, LanguageCode };
export default translation;
