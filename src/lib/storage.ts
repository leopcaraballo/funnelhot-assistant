import { Assistant } from '@/types/assistant';

/**
 * Local storage key used to persist assistants.
 */
const STORAGE_KEY = 'funnelhot.assistants';

/**
 * Retrieves all assistants from localStorage.
 *
 * Returns an empty array when running on the server,
 * when no data is found, or when parsing fails.
 */
export function getAssistants(): Assistant[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as Assistant[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[storage] Error parsing assistants', error);
    return [];
  }
}

/**
 * Retrieves a single assistant by its identifier.
 */
export function getAssistantById(id: string): Assistant | null {
  const assistants = getAssistants();
  return assistants.find(assistant => assistant.id === id) ?? null;
}

/**
 * Persists a new assistant in localStorage.
 */
export function createAssistant(assistant: Assistant): void {
  const assistants = getAssistants();
  const updated = [...assistants, assistant];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Updates an existing assistant using partial data.
 */
export function updateAssistant(id: string, data: Partial<Assistant>): void {
  const assistants = getAssistants();

  const updated = assistants.map(assistant => (assistant.id === id ? { ...assistant, ...data } : assistant));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Removes an assistant from localStorage by its identifier.
 */
export function deleteAssistant(id: string): void {
  const assistants = getAssistants();
  const updated = assistants.filter(assistant => assistant.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
