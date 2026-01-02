'use client';

/**
 * @file ChatMessage.tsx
 * @description Presentational component for individual message bubbles in the chat.
 */

import styles from './ChatMessage.module.css';

interface Props {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Renders a chat bubble with styles that distinguish between user and assistant.
 */
export function ChatMessage({ role, content }: Props) {
  return (
    <div
      className={`
        ${styles.message} 
        ${role === 'user' ? styles.user : styles.assistant}
      `}>
      <div className={styles.content}>
        <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
      </div>
    </div>
  );
}
