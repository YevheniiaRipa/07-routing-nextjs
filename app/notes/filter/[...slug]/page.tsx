import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface FilteredNotesPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const resolvedParams = await params;

  const queryClient = new QueryClient();
  const tag =
    resolvedParams.slug?.[0] === 'all' ? undefined : resolvedParams.slug?.[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag || ''],
    queryFn: () => fetchNotes({ page: 1, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
