export const LOCALE_FEATURES = {
  english: {
    locale: "en",
    title: "English",
    icon: "/assets/icons/english.svg",
    mobile: "En-Us",
  },
  spanish: {
    locale: "es",
    title: "Español",
    icon: "/assets/icons/spanish.svg",
    mobile: "Es-Es",
  },
  portuguese: {
    locale: "pt",
    title: "Português",
    icon: "/assets/icons/portuguese.svg",
    mobile: "Pt-Br",
  },
} as const;

export const LOCALE_LANGUAGES = {
  en: "english",
  es: "spanish",
  pt: "portuguese",
} as const;
