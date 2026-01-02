'use client';

/**
 * @file ChatWindow.tsx
 * @description Interface para la simulación de chat de entrenamiento.
 * Gestiona el historial de mensajes, la persistencia en LocalStorage y respuestas simuladas.
 */

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { ChatMessage } from '../chatMessage/ChatMessage';
import type { AssistantLanguage } from '@/types/assistant';
import { MOCK_CHAT_RESPONSES } from '@/lib/mockResponses';
import styles from './ChatWindow.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  assistantId: string;
  assistantLanguage: AssistantLanguage;
}

/**
 * Ventana de chat con scroll automático y persistencia por ID de asistente.
 */
export function ChatWindow({ assistantId, assistantLanguage }: Props) {
  const t = useTranslations('chat');
  const storageKey = `chat_history_${assistantId}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Carga el historial guardado en el cliente tras el montaje inicial.
   */
  useEffect(() => {
    const savedChat = localStorage.getItem(storageKey);
    if (savedChat) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        console.error('Error al cargar chat', e);
      }
    }
    setIsHydrated(true);
  }, [storageKey]);

  /**
   * Sincroniza el estado de los mensajes con LocalStorage.
   */
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey, isHydrated]);

  /**
   * Mantiene el scroll en la parte inferior al recibir o enviar mensajes.
   */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  /**
   * Gestiona el envío de mensajes del usuario y genera respuesta automática.
   */
  const sendMessage = () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulación de delay de procesamiento de la IA
    setTimeout(() => {
      const pool = MOCK_CHAT_RESPONSES[assistantLanguage] || MOCK_CHAT_RESPONSES['en'];
      const randomResponse = pool[Math.floor(Math.random() * pool.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setLoading(false);
    }, 1200);
  };

  /**
   * Limpia el historial de la conversación actual.
   */
  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem(storageKey);
  };

  // Evita problemas de hidratación en SSR al depender de localStorage
  if (!isHydrated) return null;

  return (
    <div className={styles.container}>
      <div className={styles.messages} ref={scrollRef}>
        {messages.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>{t('startConversation')}</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} {...msg} />
        ))}
        {loading && <ChatMessage role='assistant' content={t('typing')} />}
      </div>

      <div className={styles.inputArea}>
        <div className={styles.inputField}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
            placeholder={t('placeholder')}
            label=''
          />
        </div>
        <div className={styles.actions}>
          <Button onClick={sendMessage} loading={loading} variant='primary' size='sm'>
            {t('send')}
          </Button>
          <Button variant='secondary' onClick={handleReset} disabled={loading} size='sm'>
            {t('reset')}
          </Button>
        </div>
      </div>
    </div>
  );
}
