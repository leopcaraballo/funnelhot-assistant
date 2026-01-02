export type AssistantLanguage = 'es' | 'en' | 'pt-BR';
export type AssistantTone = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';

export interface ResponseLength {
  short: number;
  medium: number;
  long: number;
}

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
