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

export default function HomePage() {
  const t = useTranslations('home');
  const tAssistants = useTranslations('assistants');

  const router = useRouter();
  const { assistants, mounted, deleteAssistant, createAssistant, updateAssistant } = useAssistants();

  // Estados para controlar la visibilidad de los Modales
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Estados para manejar el asistente seleccionado (edición o borrado)
  const [editing, setEditing] = useState<Assistant | null>(null);
  const [assistantToDelete, setAssistantToDelete] = useState<Assistant | null>(null);

  // Estado de carga cosmético para suavizar la entrada de datos (Luxury UX)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Un tiempo de 800ms permite que el usuario perciba el estado de carga
    // sin que la espera resulte frustrante.
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
    if (assistantToDelete) {
      deleteAssistant(assistantToDelete.id);
      setDeleteModalOpen(false);
      setAssistantToDelete(null);
    }
  };

  // Estado de carga inicial y montaje de cliente
  if (!mounted || loading) {
    return (
      <div
        style={{
          padding: '40px 24px',
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          maxWidth: 1200,
          margin: '0 auto',
        }}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header con Título y Acciones Globales */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 48,
        }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}>
          {t('title')}
        </h1>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <LanguageSwitcher />
          <Button onClick={() => setModalOpen(true)}>{t('create')}</Button>
        </div>
      </header>

      {/* Listado de Asistentes o Estado Vacío */}
      {assistants.length === 0 ? (
        <div style={{ marginTop: 60 }}>
          <EmptyState
            title={t('emptyTitle')}
            description={t('emptyDescription')}
            actionLabel={t('create')}
            onAction={() => setModalOpen(true)}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: 28,
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          }}>
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

      {/* Modal Principal: Creación y Edición de Asistentes */}
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

      {/* Modal de Confirmación de Borrado: UX Premium para evitar borrados accidentales */}
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
