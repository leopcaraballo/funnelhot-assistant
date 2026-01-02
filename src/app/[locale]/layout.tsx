/**
 * Root layout for localized routes.
 * Initializes the internationalization provider and defines font variables.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import '@/styles/globals.css';
import { AssistantLanguage } from '@/types/assistant';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Funnelhot Assistant',
  description: 'AI Assistant Management Platform',
  keywords: ['AI', 'Assistant', 'Management', 'Platform'],
  authors: [{ name: 'Leopoldo Caraballo' }],
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Standard RootLayout. Validates the locale segment against supported languages.
 */
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AssistantLanguage)) {
    notFound();
  }

  // Fetch messages server-side to pass them into the client provider
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning>
      <body className={inter.variable}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
