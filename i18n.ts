import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./api/actions/userLocale";

const locales = ["en", "es", "pt"];

export default getRequestConfig(async () => {
  let locale = await getUserLocale();

  if (!locales.includes(locale)) locale = "en";

  const messages = {
    ...(await import(`@/app/(app)/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/login/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/verify/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/forgot-password/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/forgot-password/email-sent/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/sign-up/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/sign-up/email-sent/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/reset-password/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/reset-password/success/locales/${locale}.json`)).default,
    ...(await import(`@/components/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/profile/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/preferences/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/admin/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/backoffice/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/course/[id]/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/ranking/locales/${locale}.json`)).default,
  };

  return {
    locale,
    messages: messages,
  };
});
