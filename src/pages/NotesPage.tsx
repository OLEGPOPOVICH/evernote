import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as L from '@korus/leda';
import { objsToQueryParams } from '@common/utils/objects';

import {
  Notes,
  NotesType,
  selectors as notesSelectors,
  actions as notesActions,
} from '@features/notes';
import { selectors as navSelectors } from '@features/navigation';

/**
 * ## Компонент страницы заметок
 *
 * @returns {JSX.Element} Компонент страницы заметок
 */
export const NotesPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { notes }: NotesType = useSelector(notesSelectors.getNotes);
  const queryParams = useSelector(navSelectors.queryParams);
  const queryStr = objsToQueryParams(queryParams);

  useEffect(() => {
    dispatch(notesActions.loadingNotesPage());

    return () => {
      dispatch(notesActions.clearElemState({ notes }));
    };
  }, [dispatch]);

  return (
    <>
      <L.H1>Списко заметок</L.H1>
      <Notes notes={notes} queryStr={queryStr} />
    </>
  );
};
