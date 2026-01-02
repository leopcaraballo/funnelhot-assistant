/**
 * @file Navigation utilities for internationalized routing.
 * Provides localized wrappers for Next.js navigation APIs based on the routing config.
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Shared navigation instances for localized routing.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
