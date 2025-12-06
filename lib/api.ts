import axios from 'axios';
import type { Note } from '@/types/note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const apiClient = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await apiClient.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search,
    },
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export type NewNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export const createNote = async (note: NewNote): Promise<Note> => {
  const response = await apiClient.post<Note>('/notes', note, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await apiClient.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await apiClient.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
