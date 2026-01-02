'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Assistant, AssistantLanguage, AssistantTone } from '@/types/assistant';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { Select } from '@/components/ui/select/Select';
import { Textarea } from '@/components/ui/textarea/Textarea';
import styles from './AssistantForm.module.css';

interface Props {
  initialData?: Assistant;
  onSave: (assistant: Assistant) => void;
  onCancel: () => void;
}

const LANGUAGES: { label: string; value: AssistantLanguage }[] = [
  { label: 'Español', value: 'es' },
  { label: 'English', value: 'en' },
  { label: 'Português', value: 'pt-BR' },
];

const TONES: AssistantTone[] = ['Formal', 'Casual', 'Profesional', 'Amigable'];

export function AssistantForm({ initialData, onSave, onCancel }: Props) {
  const t = useTranslations('assistants');
  const tCommon = useTranslations('common');

  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Función robusta para generar ID si randomUUID falla (entornos HTTP/IP Local)
  const generateSafeId = () => {
    if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };

  // Lazy Initialization del estado para evitar recrear datos en cada render
  const [form, setForm] = useState<Assistant>(
    () =>
      initialData ?? {
        id: generateSafeId(),
        name: '',
        language: 'es',
        tone: 'Profesional',
        responseLength: { short: 0, medium: 0, long: 0 },
        audioEnabled: false,
        rules: '',
        createdAt: new Date().toISOString(),
      },
  );

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (form.name.trim().length < 3) {
      newErrors.name = t('form.errors.nameLength');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSave = () => {
    // Aseguramos que los valores sean tratados como números para la suma
    const total =
      Number(form.responseLength.short || 0) +
      Number(form.responseLength.medium || 0) +
      Number(form.responseLength.long || 0);

    if (total !== 100) {
      setErrors({ responseLength: t('form.errors.totalPercentage') });
      return;
    }
    onSave(form);
  };

  const isEditing = !!initialData;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{isEditing ? t('form.editTitle') : t('form.createTitle')}</h2>
          <p className={styles.subtitle}>{step === 1 ? t('form.step1Title') : t('form.step2Title')}</p>
        </div>
        <span className={styles.stepIndicator}>{tCommon('step', { current: step, total: 2 })}</span>
      </div>

      {step === 1 ? (
        <div className={styles.stepContent}>
          <Input
            label={t('name')}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            placeholder={t('form.placeholders.name')}
            autoFocus
          />

          <Select
            label={t('language')}
            value={form.language}
            onChange={e => setForm({ ...form, language: e.target.value as AssistantLanguage })}>
            {LANGUAGES.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </Select>

          <Select
            label={t('tone')}
            value={form.tone}
            onChange={e => setForm({ ...form, tone: e.target.value as AssistantTone })}>
            {TONES.map(toneKey => (
              <option key={toneKey} value={toneKey}>
                {t(`tones.${toneKey}`)}
              </option>
            ))}
          </Select>

          <div className={styles.actions}>
            <Button variant='secondary' onClick={onCancel} type='button'>
              {tCommon('cancel')}
            </Button>
            <Button variant='primary' onClick={handleNext} type='button'>
              {tCommon('next')}
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.stepContent}>
          <div className={styles.percentGroup}>
            <span className={styles.percentLabel}>{t('form.responseLengthTitle')}</span>
            <div className={styles.gridInputs}>
              <Input
                label={t('form.short')}
                type='number'
                min={0}
                max={100}
                value={form.responseLength.short}
                onChange={e =>
                  setForm({
                    ...form,
                    responseLength: { ...form.responseLength, short: Number(e.target.value) },
                  })
                }
              />
              <Input
                label={t('form.medium')}
                type='number'
                min={0}
                max={100}
                value={form.responseLength.medium}
                onChange={e =>
                  setForm({
                    ...form,
                    responseLength: { ...form.responseLength, medium: Number(e.target.value) },
                  })
                }
              />
              <Input
                label={t('form.long')}
                type='number'
                min={0}
                max={100}
                value={form.responseLength.long}
                onChange={e =>
                  setForm({
                    ...form,
                    responseLength: { ...form.responseLength, long: Number(e.target.value) },
                  })
                }
              />
            </div>
          </div>

          {errors.responseLength && <div className={styles.errorMessage}>{errors.responseLength}</div>}

          <Textarea
            label={t('form.rules')}
            value={form.rules}
            onChange={e => setForm({ ...form, rules: e.target.value })}
            placeholder={t('form.placeholders.rules')}
            rows={5}
          />

          <div className={styles.actions}>
            <Button variant='secondary' onClick={() => setStep(1)} type='button'>
              {tCommon('back')}
            </Button>
            <Button variant='primary' onClick={handleSave} type='button'>
              {tCommon('save')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
