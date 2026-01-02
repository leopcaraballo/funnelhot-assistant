import { defineRouting } from 'next-intl/routing';

/**
 * Internationalization routing configuration.
 *
 * Defines the supported locales and the default locale used
 * when no explicit locale is resolved from the request.
 */
export const routing = defineRouting({
  // List of supported application locales
  locales: ['es', 'en', 'pt-BR'],

  // Fallback locale when no match is found
  defaultLocale: 'es',
});
