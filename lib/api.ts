import axios from 'axios';
import type { NewNoteData, Note } from '../types/note.ts';

export type ResponseData = {
  notes: Note[];
  totalPages: number;
};

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number
): Promise<ResponseData> {
  const { data } = await axios.get<ResponseData>('https://notehub-public.goit.study/api/notes', {
    params: { search, page, perPage },
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return data;
}

export async function addNote(newNoteData: NewNoteData): Promise<Note> {
  const { data } = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    newNoteData,
    {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,

    {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,

    {
      headers: {
        Authorization: `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
}
