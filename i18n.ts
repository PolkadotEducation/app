import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // TODO Dynamic locale
  const locale = "en";

  const messages = {
    ...(await import(`@/app/(app)/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/login/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/forgot-password/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/forgot-password/email-sent/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/sign-up/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/sign-up/email-sent/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/reset-password/locales/${locale}.json`)).default,
    ...(await import(`@/app/(unauthenticated)/reset-password/success/locales/${locale}.json`)).default,
    ...(await import(`@/components/locales/${locale}.json`)).default,
    ...(await import(`@/app/(app)/profile/locales/${locale}.json`)).default,
  };

  return {
    locale,
    messages: messages,
  };
});
