'use client';

import { Button } from '../button/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  icon?: React.ReactNode; // Prop opcional para elevar el diseño
}

export function EmptyState({ title, description, actionLabel, onAction, className, icon }: EmptyStateProps) {
  return (
    <section className={[styles.container, className].filter(Boolean).join(' ')} aria-live='polite'>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      <h3 className={styles.title}>{title}</h3>

      {description && <p className={styles.description}>{description}</p>}

      {actionLabel && onAction && (
        <div className={styles.action}>
          {/* Usamos el botón primario con el radio capsular que definimos antes */}
          <Button onClick={onAction} size='md' variant='primary'>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
