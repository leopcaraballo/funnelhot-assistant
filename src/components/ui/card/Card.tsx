'use client';

/**
 * @file Card.tsx
 * @description A flexible container component providing consistent spacing,
 * borders, and elevation styles for UI sections.
 */

import { forwardRef } from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Defines the HTML semantic tag to render. */
  as?: 'div' | 'section' | 'article';
  /** Visual style: 'default' for standard background, 'glass' for semi-transparent blur effect. */
  variant?: 'default' | 'glass';
}

/**
 * Reusable Card component with support for semantic tags and hover transitions.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ as: Component = 'div', children, className, variant = 'default', ...props }, ref) => {
    const cardClasses = [styles.card, variant === 'glass' ? styles.glass : '', className].filter(Boolean).join(' ');

    return (
      <Component ref={ref} className={cardClasses} {...props}>
        {children}
      </Component>
    );
  },
);

Card.displayName = 'Card';
