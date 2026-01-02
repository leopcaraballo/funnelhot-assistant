import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value;

  const locale = hasLocale(routing.locales, cookieLocale)
    ? cookieLocale
    : hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
