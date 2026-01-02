'use client';

/**
 * @file SkeletonCard.tsx
 * @description Loading state placeholder for the AssistantCard component.
 * Uses a shimmer animation to indicate active content loading.
 */

import styles from './SkeletonCard.module.css';

/**
 * Skeleton component that mimics the structure of the AssistantCard.
 */
export const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
      </div>

      <div className={styles.metaRow}>
        <div className={`${styles.skeleton} ${styles.line}`} style={{ width: '40%' }}></div>
        <div className={`${styles.skeleton} ${styles.line}`} style={{ width: '70%' }}></div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <div className={`${styles.skeleton} ${styles.button}`}></div>
        <div className={`${styles.skeleton} ${styles.button}`}></div>
        <div className={`${styles.skeleton} ${styles.button}`}></div>
      </div>
    </div>
  );
};
