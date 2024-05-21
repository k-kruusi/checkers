import en from '../../public/locales/en/translation.json';

export enum Locales {
  EN = 'en'
};

export function getString(key: string, locale: Locales = Locales.EN) {
  switch (locale) {
    case Locales.EN:
      return en[key as keyof typeof en] ?? '';
    default:
      return "";
  }
}