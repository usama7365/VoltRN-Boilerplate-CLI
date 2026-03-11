import i18n from '@i18n/i18n';

export const switchLocaleTo = (locale: string) => {
  i18n.changeLanguage(locale);
};
