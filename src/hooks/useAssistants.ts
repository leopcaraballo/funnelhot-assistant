'use client';

import { useCallback, useEffect, useState } from 'react';
import { Assistant } from '@/types/assistant';
import {
  getAssistants,
  getAssistantById as getById,
  createAssistant as create,
  updateAssistant as update,
  deleteAssistant as remove,
} from '@/lib/storage';

export function useAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const data = getAssistants();
      setAssistants(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createAssistant = (assistant: Assistant) => {
    create(assistant);
    loadData();
  };

  const updateAssistant = (id: string, data: Partial<Assistant>) => {
    update(id, data);
    loadData();
  };

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
