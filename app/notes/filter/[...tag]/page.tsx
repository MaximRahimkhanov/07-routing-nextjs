import { NoteList } from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ tag?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.tag || [];
  const tag = slug[0] || 'all';

  const { notes } = await fetchNotes({
    searchText: '',
    page: 1,
    ...(tag && tag !== 'all' && { tag }),
  });

  return (
    <div>
      <h2>{tag ? `Notes (${tag})` : 'All notes'}</h2>
      {notes.length > 0 ? <NoteList data={notes} /> : <p>No notes found.</p>}
    </div>
  );
}
