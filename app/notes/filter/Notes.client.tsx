'use client';

import { useState } from 'react';
import css from './Note.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import { NoteList } from '@/components/NoteList/NoteList';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import { Loader } from '@/components/Loader/Loader';

function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const perPage = 12;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, perPage),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (text: string) => {
    setSearch(text);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>

        {/* {isLoading || (isFetching && <p>Is Loading...</p>)} */}
        {/* {isError && <p>Помилка при запиті</p>} */}
      </header>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      {data && <NoteList data={data.notes} />}
      {isLoading || (isFetching && <Loader />)}
    </div>
  );
}
export default NotesClient;
