'use client';

/**
 * @file useAssistants hook.
 * [cite_start]@description Custom hook for managing AI assistant state and operations with local persistence. [cite: 5, 82]
 */

import { useCallback, useEffect, useState } from 'react';
import { Assistant } from '@/types/assistant';
import {
  getAssistants,
  getAssistantById as getById,
  createAssistant as create,
  updateAssistant as update,
  deleteAssistant as remove,
} from '@/lib/storage';

/**
 * [cite_start]Hook to manage the lifecycle and CRUD operations of AI assistants. [cite: 5]
 */
export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * [cite_start]Fetches data from LocalStorage and updates local state. [cite: 67, 82]
   */
  const loadData = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const data = getAssistants();
      setAssistants(data);
    } catch (e) {
      console.error('Failed to load assistants:', e);
    } finally {
      setLoading(false);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * [cite_start]persists a new assistant and refreshes the list. [cite: 18, 90]
   */
  const createAssistant = (assistant: Assistant) => {
    create(assistant);
    loadData();
  };

  /**
   * [cite_start]Updates an existing assistant by ID and refreshes state. [cite: 17, 27]
   */
  const updateAssistant = (id: string, data: Partial<Assistant>) => {
    update(id, data);
    loadData();
  };

  /**
   * [cite_start]Removes an assistant and triggers an immediate list update. [cite: 74, 77]
   */
  const deleteAssistant = (id: string) => {
    remove(id);
    loadData();
  };

  return {
    assistants,
    loading,
    mounted,
    createAssistant,
    updateAssistant,
    deleteAssistant,
    getAssistantById: getById,
  };
}
