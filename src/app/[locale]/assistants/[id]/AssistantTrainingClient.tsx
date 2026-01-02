'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useAssistants } from '@/hooks/useAssistants';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { Button } from '@/components/ui/button/Button';
import { ChatWindow } from '@/components/chat/chatWindow/ChatWindow';

import styles from './AssistantTraining.module.css';

interface Props {
  id: string;
}

export function AssistantTrainingClient({ id }: Props) {
  const t = useTranslations('training');
  const tAssistants = useTranslations('assistants');

  const { getAssistantById, updateAssistant, mounted } = useAssistants();
  const assistant = getAssistantById(id);

  const [rules, setRules] = useState(() => assistant?.rules ?? '');
  const [saved, setSaved] = useState(false);

  if (!mounted) {
    return <div className={styles.container}>Cargando parámetros...</div>;
  }

  if (!assistant) {
    return notFound();
  }

  const handleSave = () => {
    updateAssistant(assistant.id, { rules });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{assistant.name}</h1>
        <p className={styles.meta}>
          <span className={styles.badge}>{assistant.language.toUpperCase()}</span>
          <span> · {tAssistants(`tones.${assistant.tone}`)}</span>
        </p>
      </header>

      <div className={styles.layout}>
        {/* RULES */}
        <section className={styles.rulesSection}>
          <div className={styles.rulesHeader}>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
          </div>

          <div className={styles.rulesBody}>
            <Textarea
              label={t('rules')}
              value={rules}
              onChange={e => setRules(e.target.value)}
              placeholder={tAssistants('form.placeholders.rules')}
              rows={8}
            />
          </div>

          <div className={styles.rulesFooter}>
            <Button onClick={handleSave}>{t('save')}</Button>
            {saved && <span className={styles.saved}>{t('saved')}</span>}
          </div>
        </section>

        {/* CHAT */}
        <section className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h2 className={styles.sectionTitle}>{t('chatTitle')}</h2>
          </div>

          <div className={styles.chatBody}>
            <ChatWindow assistantId={assistant.id} assistantLanguage={assistant.language} />
          </div>
        </section>
      </div>
    </div>
  );
}
