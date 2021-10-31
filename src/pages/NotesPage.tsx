import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as L from '@korus/leda';

import {
  Notes,
  selectors as notesSelectors,
  actions as notesActions,
} from '@features/notes';
import { selectors as navSelectors } from '@features/navigation';
import { ComponentWrapper, Pagination } from '@common/components';
import {
  FilterNotes,
  FilterNotesTypes,
} from '@features/notes/components/FilterNotes';
import { useFilterNotes } from '@features/notes/hooks';

/**
 * ## Компонент страницы заметок
 *
 * @returns {JSX.Element} Компонент страницы заметок
 */
export const NotesPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<FilterNotesTypes>({
    sort: '',
    query: '',
  });
  const { notes } = useSelector(notesSelectors.getNotes);
  const filterNotes = useFilterNotes(notes, filter.sort, filter.query);
  const { currentPage } = useSelector(notesSelectors.getCurrentPage);
  const { totalCount } = useSelector(notesSelectors.getTotalCount);
  const { pageLimit } = useSelector(notesSelectors.getPageLimit);
  const searchString = useSelector(navSelectors.searchString);

  useEffect(() => {
    dispatch(notesActions.loadingNotesPage());

    return () => {
      dispatch(notesActions.clearElemState({ notes: [] }));
    };
  }, [dispatch]);

  const handleCurrentPageChange = useCallback(
    (page) => {
      dispatch(notesActions.setCurrentPage({ currentPage: page }));
      dispatch(notesActions.loadingNotesPage());
    },
    [dispatch],
  );

  const handlePageLimitChange = useCallback(
    (e, option) => {
      dispatch(notesActions.setPageLimit({ pageLimit: option }));
      dispatch(notesActions.setCurrentPage({ currentPage: 1 }));
      dispatch(notesActions.loadingNotesPage());
    },
    [dispatch],
  );

  return (
    <>
      <L.H1>Списко заметок</L.H1>
      <FilterNotes filter={filter} setFilter={setFilter} />
      <ComponentWrapper data={filterNotes.length} info="Заметок не найдено">
        <Notes notes={filterNotes} queryStr={searchString} />
      </ComponentWrapper>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageLimit={pageLimit}
        pageNeighbours={2}
        pageLimitOptions={[
          { name: '5', value: 5 },
          { name: '10', value: 10 },
          { name: '20', value: 20 },
          { name: '50', value: 50 },
        ]}
        onCurrentPageChange={handleCurrentPageChange}
        onPageLimitChange={handlePageLimitChange}
      />
    </>
  );
};
