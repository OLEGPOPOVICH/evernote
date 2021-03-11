import React, { useEffect } from 'react';
import {
  actions as notesActions,
  NoteDetail,
  NoteType,
  selectors,
} from '@features/notes';
import { useDispatch, useSelector } from 'react-redux';

export const NoteDetailPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { note }: NoteType = useSelector(selectors.getNote);

  useEffect(() => {
    dispatch(notesActions.loadingNoteDetailPage());

    return () => {
      dispatch(notesActions.setInitialStore());
    };
  }, []);

  return <NoteDetail {...note} />;
};
