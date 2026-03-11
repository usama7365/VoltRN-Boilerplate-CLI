import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Text } from 'react-native';
import { defaultLanguage, languagesResources } from './languageConfig';
import RNLanguageDetector from './languageDetector';

i18n
  // @ts-ignore
  .use(RNLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // @ts-ignore
    debug: process.env.NODE_ENV === 'development',
    resources: languagesResources,
    compatibilityJSON: 'v3',
    // language to use if translations in user language are not available.
    fallbackLng: defaultLanguage,

    ns: ['common'],
    defaultNS: 'common',

    // Use dot notation for both namespaces and keys
    keySeparator: '.',
    nsSeparator: false, // Disable namespace separator to use dots for nested keys only

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
      defaultTransParent: Text,
      transSupportBasicHtmlNodes: false,
    },
  });

export default i18n;
