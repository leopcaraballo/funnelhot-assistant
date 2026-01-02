'use client';

import { useTranslations } from 'next-intl';
import { Assistant } from '@/types/assistant';
import styles from './AssistantCard.module.css';
import { Card } from '@/components/ui/card/Card';
import { Button } from '@/components/ui/button/Button';

interface Props {
  assistant: Assistant;
  onEdit: () => void;
  onDelete: () => void;
  onTrain: () => void;
}

// Mapeo de idiomas fuera del componente para evitar recrearlo en cada render
const LANGUAGE_NAMES: Record<string, string> = {
  es: 'Español',
  en: 'English',
  'pt-BR': 'Português',
};

export function AssistantCard({ assistant, onEdit, onDelete, onTrain }: Props) {
  const t = useTranslations('assistants');

  // Obtenemos el nombre del idioma o un fallback elegante
  const languageDisplayName = LANGUAGE_NAMES[assistant.language] || 'Unknown';

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3>{assistant.name}</h3>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaRow}>
          <strong>{t('language')}</strong>
          <span>{languageDisplayName}</span>
        </div>

        <div className={styles.metaRow}>
          <strong>{t('tone')}</strong>
          <span>{t(`tones.${assistant.tone}`) || assistant.tone}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button size='sm' variant='secondary' onClick={onEdit}>
          {t('edit')}
        </Button>
        <Button size='sm' variant='secondary' onClick={onTrain}>
          {t('train')}
        </Button>
        <Button size='sm' variant='danger' onClick={onDelete}>
          {t('delete')}
        </Button>
      </div>
    </Card>
  );
}
