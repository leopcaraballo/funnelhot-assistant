'use client';

/**
 * @file DeleteConfirmModal.tsx
 * @description Dialog for assistant deletion using rich text translations.
 * Handles dynamic content injection into localized strings.
 */

import { Modal } from '@/components/ui/modal/Modal';
import { Button } from '@/components/ui/button/Button';
import { useTranslations } from 'next-intl';
import styles from './DeleteConfirmModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  assistantName: string;
}

/**
 * Modal to confirm deletion. Uses t.rich to parse HTML-like tags within
 * translation strings for consistent styling.
 */
export function DeleteConfirmModal({ isOpen, onClose, onConfirm, assistantName }: Props) {
  const t = useTranslations('common');

  return (
    <Modal open={isOpen} onClose={onClose} title={t('confirmDelete')} width='sm'>
      <div className={styles.content}>
        <p>
          {t.rich('deleteWarning', {
            name: assistantName,
            // standard tag mapping to avoid INVALID_TAG errors
            strong: chunks => <strong>{chunks}</strong>,
          })}
        </p>
        <div className={styles.actions}>
          <Button variant='secondary' onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            {t('delete')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
