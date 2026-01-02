'use client';

import { forwardRef } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading = false, disabled, className, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const buttonClasses = [styles.button, styles[variant], styles[size], loading ? styles.loading : '', className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={buttonClasses} disabled={isDisabled} aria-busy={loading} {...props}>
        <span className={styles.content}>{children}</span>

        {loading && (
          <span className={styles.loader}>
            {/* Aquí podrías poner un SVG de Spinner circular minimalista */}
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
