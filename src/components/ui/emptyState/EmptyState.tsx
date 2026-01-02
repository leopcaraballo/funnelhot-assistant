'use client';

/**
 * @file EmptyState.tsx
 * @description Component displayed when no data is available, providing context and a primary call to action.
 */

import { Button } from '../button/Button';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  /** Optional icon or illustration to enhance the visual context. */
  icon?: React.ReactNode;
}

/**
 * A centered, animated placeholder for empty lists or search results.
 */
export function EmptyState({ title, description, actionLabel, onAction, className, icon }: EmptyStateProps) {
  return (
    <section className={[styles.container, className].filter(Boolean).join(' ')} aria-live='polite'>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}

      <h3 className={styles.title}>{title}</h3>

      {description && <p className={styles.description}>{description}</p>}

      {actionLabel && onAction && (
        <div className={styles.action}>
          <Button onClick={onAction} size='md' variant='primary'>
            {actionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
