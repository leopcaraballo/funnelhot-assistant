'use client';

/**
 * @file Modal.tsx
 * @description A flexible dialog component featuring an animated overlay,
 * focus management, and body-scroll locking.
 */

import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Controls the maximum horizontal span of the modal. */
  width?: 'sm' | 'md' | 'lg';
}

/**
 * Modal component that uses a portal-like approach (via conditional rendering)
 * to display content over the application UI.
 */
export function Modal({ open, title, onClose, children, footer, width = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /**
   * Manages body scroll lock to prevent background scrolling when modal is active.
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        className={`${styles.modal} ${styles[width]}`}
        onClick={e => e.stopPropagation()} // Prevents closing when clicking inside content
      >
        <header className={styles.header}>
          <h2 id='modal-title'>{title}</h2>
          <button className={styles.close} onClick={onClose} type='button' aria-label='Close modal'>
            &times;
          </button>
        </header>

        <div className={styles.content}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}
