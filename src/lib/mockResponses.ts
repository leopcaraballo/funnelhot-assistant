import type { AssistantLanguage } from '@/types/assistant';

export const MOCK_CHAT_RESPONSES: Record<AssistantLanguage, string[]> = {
  es: [
    'Entendido. ¿En qué más puedo ayudarte?',
    'Esa es una excelente pregunta. Permíteme explicarte.',
    'Claro, con gusto te ayudo con eso.',
    '¿Podrías darme un poco más de contexto?',
    'Perfecto, he registrado esa información.',
    'Gracias por el detalle. Continuemos.',
    'De acuerdo. Estoy listo para ayudarte.',
  ],

  en: [
    'Got it. How can I assist you further?',
    'That’s a great question. Let me explain.',
    'Sure, I’d be happy to help with that.',
    'Could you provide a bit more context?',
    'Perfect, I’ve noted that information.',
    'Thanks for the details. Let’s continue.',
    'Alright. I’m ready to help.',
  ],

  'pt-BR': [
    'Entendido. Como posso ajudar você?',
    'Essa é uma ótima pergunta. Deixe-me explicar.',
    'Claro, fico feliz em ajudar com isso.',
    'Você poderia fornecer mais detalhes?',
    'Perfeito, registrei essa informação.',
    'Obrigado pelos detalhes. Vamos continuar.',
    'Certo. Estou pronto para ajudar.',
  ],
};
