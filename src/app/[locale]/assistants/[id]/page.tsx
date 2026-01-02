/**
 * @file page.tsx
 * @description Server component for the assistant training route.
 * Correctly handles async params and passes data to the client component.
 */

import { notFound } from 'next/navigation';
import { AssistantTrainingClient } from './AssistantTrainingClient';

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

/**
 * Server components can be async. We await params here and
 * pass the resulting ID to the client-side training interface.
 */
export default async function AssistantTrainingPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <AssistantTrainingClient id={id} />;
}
