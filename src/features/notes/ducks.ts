import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { NoteItemType, NotesType, NoteType } from './types';

const LOADING_NOTES_PAGE = 'LOADING_NOTES_PAGE';
const LOADING_NOTE_DETAIL_PAGE = 'LOADING_NOTE_DETAIL_PAGE';
const actionLoadingNotesPage = createAction(LOADING_NOTES_PAGE);
const actionLoadingNoteDetailPage = createAction(LOADING_NOTE_DETAIL_PAGE);

export type InitialState = {
  notes: NoteItemType[];
  note: NoteItemType;
};

const initialState: InitialState = {
  notes: [],
  note: {
    id: '',
    title: '',
    desc: '',
    imgUrl: '',
    date: '',
    views: 0,
    tags: [],
  },
};

/**
 * ## [Экшин] Записать список заметок в стор
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setNotes = (
  state: InitialState,
  { payload }: PayloadAction<NotesType>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] Записать заметку в стор
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setNote = (
  state: InitialState,
  { payload }: PayloadAction<NoteType>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] Обновить свойства заметки в сторе
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const updateNote = (
  state: InitialState,
  { payload }: PayloadAction<NoteType>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] сброс стора
 *
 * @returns {void}
 */

const setInitialStore = () => initialState;

const loginSlice = createSlice({
  name: config.modules.notes,
  initialState,
  reducers: {
    setNotes,
    setNote,
    updateNote,
    setInitialStore,
  },
});

export const notesReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  loadingNotesPage: actionLoadingNotesPage,
  loadingNoteDetailPage: actionLoadingNoteDetailPage,
};
