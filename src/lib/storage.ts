import { Assistant } from '@/types/assistant';

const STORAGE_KEY = 'funnelhot.assistants';

/**
 * Obtiene todos los asistentes desde localStorage.
 * Retorna un array vacío si no hay datos o si ocurre un error.
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
 * Obtiene un asistente por ID.
 */
export function getAssistantById(id: string): Assistant | null {
  const assistants = getAssistants();
  return assistants.find(assistant => assistant.id === id) ?? null;
}

/**
 * Crea un nuevo asistente.
 */
export function createAssistant(assistant: Assistant): void {
  const assistants = getAssistants();
  const updated = [...assistants, assistant];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Actualiza un asistente existente.
 */
export function updateAssistant(id: string, data: Partial<Assistant>): void {
  const assistants = getAssistants();

  const updated = assistants.map(assistant => (assistant.id === id ? { ...assistant, ...data } : assistant));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Elimina un asistente por ID.
 */
export function deleteAssistant(id: string): void {
  const assistants = getAssistants();
  const updated = assistants.filter(assistant => assistant.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
