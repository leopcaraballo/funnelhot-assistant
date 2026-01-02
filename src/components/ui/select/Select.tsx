'use client';

/**
 * @file Select.tsx
 * @description Custom dropdown select component with integrated labeling,
 * validation states, and a customized chevron icon.
 */

import { useId, forwardRef } from 'react';
import styles from './Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Accessible Select component using forwardRef.
 * Replaces default browser styling with a custom theme-compliant appearance.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, id, disabled, children, containerClassName, className, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div
        className={[styles.wrapper, error ? styles.hasError : '', disabled ? styles.disabled : '', containerClassName]
          .filter(Boolean)
          .join(' ')}>
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>

        <select
          ref={ref}
          id={selectId}
          className={[styles.select, className].filter(Boolean).join(' ')}
          aria-invalid={!!error}
          disabled={disabled}
          {...props}>
          {children}
        </select>

        {error && (
          <span className={styles.error} role='alert'>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
