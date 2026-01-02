/**
 * Internationalization middleware.
 *
 * Wires `next-intl` into the application to handle locale detection
 * and locale-aware routing based on the central routing configuration.
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Initialize and export the i18n middleware using the app routing setup.
 */
export default createMiddleware(routing);

/**
 * Middleware route matching configuration.
 *
 * Excludes API routes, internal Next.js paths, Vercel internals,
 * and static asset requests.
 */
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
