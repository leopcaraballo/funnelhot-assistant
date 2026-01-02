'use client';

/**
 * @file LanguageSwitcher.tsx
 * @description A dropdown component to toggle application locales.
 * Features automatic path redirection and click-outside detection.
 */

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import React, { useState, useRef, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import styles from './LanguageSwitcher.module.css';

/**
 * List of available locales with their codes, labels, and country codes.
 */
const locales = [
  { code: 'es', label: 'Español', country: 'ES' },
  { code: 'en', label: 'English', country: 'US' },
  { code: 'pt-BR', label: 'Português', country: 'BR' },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Closes the dropdown when a click occurs outside the component container.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Replaces the locale segment in the current URL and triggers navigation.
   */
  const changeLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (segments[1] === currentLocale) segments[1] = newLocale;
    const newPath = segments.join('/') || '/';
    router.push(newPath);
    setOpen(false);
  };

  const current = locales.find(l => l.code === currentLocale);

  return (
    <div className={styles.container} ref={containerRef}>
      <button className={styles.button} onClick={() => setOpen(!open)}>
        {current && (
          <ReactCountryFlag
            countryCode={current.country}
            svg
            className={styles.flag}
            style={{ width: '20px', height: '15px', borderRadius: '2px', objectFit: 'cover' }}
          />
        )}
        <span>{current?.label}</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {locales
            .filter(l => l.code !== currentLocale)
            .map(locale => (
              <button key={locale.code} onClick={() => changeLocale(locale.code)} className={styles.dropdownItem}>
                <ReactCountryFlag
                  countryCode={locale.country}
                  svg
                  style={{ width: '18px', height: '13px', borderRadius: '2px', objectFit: 'cover' }}
                />
                <span>{locale.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
