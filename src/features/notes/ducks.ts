import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import { ActiveTagType, NoteItemType, NotesType, NoteType } from './types';

const LOADING_NOTES_PAGE = 'LOADING_NOTES_PAGE';
const LOADING_NOTE_DETAIL_PAGE = 'LOADING_NOTE_DETAIL_PAGE';
const actionLoadingNotesPage = createAction(LOADING_NOTES_PAGE);
const actionLoadingNoteDetailPage = createAction(LOADING_NOTE_DETAIL_PAGE);

export type InitialState = {
  notes: NoteItemType[];
  note: NoteItemType;
  activeTag: string;
};

export type ClearElemType = {
  notes?: NoteItemType[];
  note?: NoteItemType;
  activeTag?: string;
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
  activeTag: '',
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
 * ## [Экшин] Установить активный тег
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setActiveTag = (
  state: InitialState,
  { payload }: PayloadAction<ActiveTagType>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] Очистить элемент состояния модуля
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const clearElemState = (
  state: InitialState,
  { payload }: PayloadAction<ClearElemType>,
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
    setInitialStore,
    setActiveTag,
    updateNote,
    clearElemState,
  },
});

export const notesReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  loadingNotesPage: actionLoadingNotesPage,
  loadingNoteDetailPage: actionLoadingNoteDetailPage,
};
