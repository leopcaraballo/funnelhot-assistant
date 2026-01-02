'use client';

/**
 * @file Button.tsx
 * @description A polymorphic, accessible button component supporting multiple variants,
 * sizes, and a loading state with a built-in spinner.
 */

import { forwardRef } from 'react';
import styles from './Button.module.css';

/**
 * Defines the visual style and dimensions of the button.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Indicates if the button is in a processing state, showing a spinner and disabling interaction. */
  loading?: boolean;
}

/**
 * Reusable Button component using forwardRef to allow parent components to access the DOM node.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, disabled, className, ...props }, ref) => {
    const isDisabled = disabled || loading;

    // Filter(Boolean) ensures no empty strings are joined if a style or className is undefined.
    const buttonClasses = [styles.button, styles[variant], styles[size], loading ? styles.loading : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={buttonClasses} disabled={isDisabled} aria-busy={loading} {...props}>
        <span className={styles.content}>{children}</span>

        {loading && (
          <span className={styles.loader}>
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              style={{ animation: 'spin 1s linear infinite' }}>
              <path d='M21 12a9 9 0 1 1-6.219-8.56' />
            </svg>
            <style jsx>{`
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
