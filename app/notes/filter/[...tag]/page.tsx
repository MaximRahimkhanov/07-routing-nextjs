import { NoteList } from '@/components/NoteList/NoteList';
import { fetchNoteByTag } from '@/lib/api';
import { Note } from '@/types/note';

type Props = {
  params: Promise<{ tag?: string[] }>;
};

export default async function FilteredNotesPage({ params }: Props) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag?.[0];
  const notes: Note[] = await fetchNoteByTag(tag);

  return (
    <div>
      <h2>{tag ? `Notes (${tag})` : 'All notes'}</h2>
      {notes.length > 0 ? <NoteList data={notes} /> : <p>No notes found.</p>}
    </div>
  );
}
