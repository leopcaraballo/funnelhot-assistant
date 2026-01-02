'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { useAssistants } from '@/hooks/useAssistants';
import { Assistant } from '@/types/assistant';

import { AssistantCard } from '@/components/assistants/assistantCard/AssistantCard';
import { AssistantForm } from '@/components/assistants/assistantForm/AssistantForm';
import { Button } from '@/components/ui/button/Button';
import { EmptyState } from '@/components/ui/emptyState/EmptyState';
import { Modal } from '@/components/ui/modal/Modal';
import { LanguageSwitcher } from '@/components/ui/languageSwitcher/LanguageSwitcher';
import { SkeletonCard } from '@/components/ui/skeletonCard/SkeletonCard';
import { DeleteConfirmModal } from '@/components/ui/deleteConfirmModal/DeleteConfirmModal';

import styles from './HomePage.module.css';

export default function HomePage() {
  const t = useTranslations('home');
  const tAssistants = useTranslations('assistants');

  const router = useRouter();
  const { assistants, mounted, deleteAssistant, createAssistant, updateAssistant } = useAssistants();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editing, setEditing] = useState<Assistant | null>(null);
  const [assistantToDelete, setAssistantToDelete] = useState<Assistant | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (assistant: Assistant) => {
    if (editing) {
      updateAssistant(editing.id, assistant);
    } else {
      createAssistant(assistant);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDeleteConfirm = () => {
    if (!assistantToDelete) return;
    deleteAssistant(assistantToDelete.id);
    setDeleteModalOpen(false);
    setAssistantToDelete(null);
  };

  if (!mounted || loading) {
    return (
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('title')}</h1>

        <div className={styles.headerActions}>
          <LanguageSwitcher />
          <Button onClick={() => setModalOpen(true)}>{t('create')}</Button>
        </div>
      </header>

      {assistants.length === 0 ? (
        <div className={styles.emptyWrapper}>
          <EmptyState
            title={t('emptyTitle')}
            description={t('emptyDescription')}
            actionLabel={t('create')}
            onAction={() => setModalOpen(true)}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {assistants.map(assistant => (
            <AssistantCard
              key={assistant.id}
              assistant={assistant}
              onEdit={() => {
                setEditing(assistant);
                setModalOpen(true);
              }}
              onTrain={() => router.push(`/assistants/${assistant.id}`)}
              onDelete={() => {
                setAssistantToDelete(assistant);
                setDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? tAssistants('edit') : t('create')}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}>
        <AssistantForm
          initialData={editing ?? undefined}
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      </Modal>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        assistantName={assistantToDelete?.name || ''}
        onClose={() => {
          setDeleteModalOpen(false);
          setAssistantToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
