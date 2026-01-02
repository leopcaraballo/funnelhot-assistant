import type { AssistantLanguage } from '@/types/assistant';

/**
 * Mock chat responses by language.
 *
 * Used for development, previews, and UI states where a real
 * assistant response is not required.
 */
export const MOCK_CHAT_RESPONSES: Record<AssistantLanguage, string[]> = {
  es: [
    'Entendido. ¿En qué más puedo ayudarte?',
    'Esa es una excelente pregunta. Permíteme explicarte.',
    'Claro, con gusto te ayudo con eso.',
    '¿Podrías darme un poco más de contexto?',
    'Perfecto, he registrado esa información.',
    'Gracias por el detalle. Continuemos.',
    'De acuerdo. Estoy listo para ayudarte.',
    'He comprendido tu solicitud.',
    'Vamos paso a paso para resolverlo.',
    'Te explico de forma clara y directa.',
    'Déjame verificar esa información.',
    'Buena observación. Sigamos desde ahí.',
    'Tiene sentido. Continuemos.',
    'Estoy procesando tu petición.',
  ],

  en: [
    'Got it. How can I assist you further?',
    'That’s a great question. Let me explain.',
    'Sure, I’d be happy to help with that.',
    'Could you provide a bit more context?',
    'Perfect, I’ve noted that information.',
    'Thanks for the details. Let’s continue.',
    'Alright. I’m ready to help.',
    'I understand your request.',
    'Let’s break this down step by step.',
    'Here is a clear and direct explanation.',
    'Let me check that for you.',
    'Good point. Let’s continue from there.',
    'That makes sense.',
    'I’m processing your request.',
  ],

  'pt-BR': [
    'Entendido. Como posso ajudar você?',
    'Essa é uma ótima pergunta. Deixe-me explicar.',
    'Claro, fico feliz em ajudar com isso.',
    'Você poderia fornecer mais detalhes?',
    'Perfeito, registrei essa informação.',
    'Obrigado pelos detalhes. Vamos continuar.',
    'Certo. Estou pronto para ajudar.',
    'Entendi sua solicitação.',
    'Vamos analisar isso passo a passo.',
    'Aqui está uma explicação clara e direta.',
    'Vou verificar essa informação.',
    'Bom ponto. Vamos continuar a partir daí.',
    'Isso faz sentido.',
    'Estou processando sua solicitação.',
  ],
};
