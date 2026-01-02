import { notFound } from 'next/navigation';
import { AssistantTrainingClient } from './AssistantTrainingClient';

interface Props {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function AssistantTrainingPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <AssistantTrainingClient id={id} />;
}
