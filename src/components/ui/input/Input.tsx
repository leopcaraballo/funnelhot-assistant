'use client';

import { useId, forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

// No requiere cambios en la lógica, pero asegúrate de que
// el uso de `styles.wrapper` y `styles.input` se mantenga.
// Un pequeño detalle de lujo es añadir `spellCheck={false}`
// en campos donde no sea necesario para evitar subrayados rojos feos.

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
          spellCheck='false' // Detalle de limpieza visual
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
