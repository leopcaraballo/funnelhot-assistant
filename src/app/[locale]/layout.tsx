import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

import '@/styles/globals.css';
import { AssistantLanguage } from '@/types/assistant';

// Configuración de la fuente
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap', // Mejora el rendimiento de carga
});

export const metadata: Metadata = {
  title: 'Funnelhot Assistant',
  description: 'AI Assistant Management Platform',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validación de seguridad para el locale
  if (!routing.locales.includes(locale as AssistantLanguage)) {
    notFound();
  }

  // Carga de mensajes para el cliente
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
