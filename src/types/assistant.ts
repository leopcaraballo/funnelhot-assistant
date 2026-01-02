/**
 * @file assistant.ts
 * @description Core domain types for AI assistants.
 * Defines the schema for configuration, storage, and multilingual support.
 */

export type AssistantLanguage = 'es' | 'en' | 'pt-BR';

/**
 * Visual or behavioral tone of the assistant responses.
 */
export type AssistantTone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';

/**
 * Distribution percentages for response lengths.
 * The sum of these values should ideally equal 100.
 */
export interface ResponseLength {
  short: number;
  medium: number;
  long: number;
}

/**
 * Main Assistant interface.
 * Represents the complete configuration and metadata of an AI agent.
 */
export interface Assistant {
  id: string;
  name: string;
  language: AssistantLanguage;
  tone: AssistantTone;
  responseLength: ResponseLength;
  audioEnabled: boolean;
  rules: string;
  createdAt: string;
}
