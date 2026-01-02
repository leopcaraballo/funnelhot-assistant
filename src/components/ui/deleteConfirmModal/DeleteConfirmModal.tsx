'use client';

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

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, assistantName }: Props) {
  const t = useTranslations('common');

  return (
    <Modal open={isOpen} onClose={onClose} title={t('confirmDelete')} width='sm'>
      <div className={styles.content}>
        <p>
          Esta acción no se puede deshacer. El asistente <strong>{assistantName}</strong> y todo su historial de
          entrenamiento serán eliminados permanentemente.
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
