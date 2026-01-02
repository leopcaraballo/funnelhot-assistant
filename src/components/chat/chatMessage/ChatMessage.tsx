import styles from './ChatMessage.module.css';

interface Props {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: Props) {
  return (
    <div
      className={`
        ${styles.message} 
        ${role === 'user' ? styles.user : styles.assistant}
      `}>
      <div className={styles.content}>
        {/* Usamos un div interno o directamente p, pero permitimos saltos de línea */}
        <p style={{ whiteSpace: 'pre-wrap' }}>{content}</p>
      </div>
    </div>
  );
}
