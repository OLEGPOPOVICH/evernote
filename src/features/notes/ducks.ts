import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';

import { NoteType } from './types';

const INIT_NOTES_PAGE = 'INIT_NOTES_PAGE';
const actionInitNotesPage = createAction(INIT_NOTES_PAGE);

export type InitialState = {
  notes: NoteType[];
};

const initialState: InitialState = {
  notes: [],
};

/**
 * ## Устанавливаем список заметок в стор
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setNotes = (
  state: InitialState,
  { payload }: PayloadAction<NoteType[]>,
): InitialState => ({
  ...state,
  notes: payload,
});

const loginSlice = createSlice({
  name: config.modules.notes,
  initialState,
  reducers: {
    setNotes,
  },
});

export const notesReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  initNotesPage: actionInitNotesPage,
};
