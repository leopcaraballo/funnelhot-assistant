'use client';

/**
 * @file Textarea.tsx
 * @description Multi-line text input component with auto-scaling focus effects,
 * accessible labeling, and custom scrollbar styling.
 */

import { useId, forwardRef } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

/**
 * Textarea component using forwardRef for hook-form compatibility.
 * Includes spellCheck='false' to maintain a clean visual interface.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    const textareaClass = [styles.textarea, error ? styles.textareaError : '', className || ''].join(' ').trim();

    return (
      <div className={styles.wrapper}>
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>

        <textarea
          id={textareaId}
          ref={ref}
          className={textareaClass}
          aria-invalid={!!error}
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

Textarea.displayName = 'Textarea';
