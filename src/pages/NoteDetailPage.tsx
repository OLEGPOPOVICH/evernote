import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { objsToQueryParams } from '@common/utils';

import {
  actions as notesActions,
  NoteDetail,
  NoteType,
  selectors,
} from '@features/notes';
import { selectors as navSelectors } from '@features/navigation';

export const NoteDetailPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { note }: NoteType = useSelector(selectors.getNote);

  const queryParams = useSelector(navSelectors.queryParams);
  const queryStr = objsToQueryParams(queryParams);

  useEffect(() => {
    dispatch(notesActions.loadingNoteDetailPage());

    return () => {
      dispatch(notesActions.setInitialStore());
    };
  }, [dispatch]);

  return <NoteDetail note={note} queryStr={queryStr} />;
};
