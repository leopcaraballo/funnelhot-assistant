'use client';

import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, title, onClose, children, footer, width = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
        onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 id='modal-title'>{title}</h2>
          <button className={styles.close} onClick={onClose} type='button'>
            {/* Usamos un icono de multiplicación más fino &times; */}
            &times;
          </button>
        </header>

        <div className={styles.content}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}
