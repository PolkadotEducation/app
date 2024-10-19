import { LOCALE_LANGUAGES } from "@/components/constants";

export type LocaleLanguage = (typeof LOCALE_LANGUAGES)[keyof typeof LOCALE_LANGUAGES];
