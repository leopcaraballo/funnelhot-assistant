'use client';

/**
 * @file Input.tsx
 * @description A custom form input component with integrated labeling,
 * error handling, and accessible state management.
 */

import { useId, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

/**
 * Standardized Input component using forwardRef and useId for accessibility.
 * Includes spellCheck='false' by default for a cleaner UI in technical fields.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, containerClassName, disabled, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        className={[styles.wrapper, error ? styles.hasError : '', disabled ? styles.disabled : '', containerClassName]
          .filter(Boolean)
          .join(' ')}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={[styles.input, className].filter(Boolean).join(' ')}
          aria-invalid={!!error}
          disabled={disabled}
          spellCheck='false'
          {...props}
        />

        {error && (
          <span className={styles.error} role='alert'>
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
