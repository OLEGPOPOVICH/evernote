import React, { useEffect } from 'react';
import * as L from '@korus/leda';

import { useDispatch, useSelector } from 'react-redux';

import {
  Notes,
  NotesType,
  selectors as notesSelectors,
  actions as notesActions,
} from '@features/notes';

/**
 * ## Компонент страницы заметок
 *
 * @returns {JSX.Element} Компонент страницы заметок
 */
export const NotesPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { notes }: NotesType = useSelector(notesSelectors.getNotes);

  useEffect(() => {
    dispatch(notesActions.initNotesPage());
  }, []);

  return (
    <>
      <L.H1>Списко заметок</L.H1>
      <Notes notes={notes} />
    </>
  );
};
