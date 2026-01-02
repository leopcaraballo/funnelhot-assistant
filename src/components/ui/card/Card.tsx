'use client';

import { forwardRef } from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'article';
  variant?: 'default' | 'glass'; // Añadimos variantes
}

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
