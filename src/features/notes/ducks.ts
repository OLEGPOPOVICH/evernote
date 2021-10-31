import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { config } from '@common/config';
import {
  ActiveTagType,
  CurrentPage,
  NoteItemType,
  NotesType,
  NoteType,
  PageLimit,
  TotalCount,
} from './types';

const LOADING_NOTES_PAGE = 'LOADING_NOTES_PAGE';
const LOADING_NOTE_DETAIL_PAGE = 'LOADING_NOTE_DETAIL_PAGE';
const actionLoadingNotesPage = createAction(LOADING_NOTES_PAGE);
const actionLoadingNoteDetailPage = createAction(LOADING_NOTE_DETAIL_PAGE);

export type FilterDateNotes = [string | null, string | null];

export type RequestFilterNotes = {
  date: FilterDateNotes;
};

export type FilterDataNotes = {
  requestFilterNotes: RequestFilterNotes;
};

export type InitialState = {
  notes: NoteItemType[];
  note: NoteItemType;
  activeTag: string;
  pageLimit: number;
  totalCount: number;
  currentPage: number;
  requestFilterNotes: RequestFilterNotes;
};

export type ClearElemType = {
  notes?: NoteItemType[];
  note?: NoteItemType;
  activeTag?: string;
};

const initialState: InitialState = {
  notes: [],
  note: {
    id: null,
    title: '',
    desc: '',
    imgUrl: '',
    date: '',
    views: 0,
  },
  activeTag: '',
  pageLimit: 5,
  totalCount: 0,
  currentPage: 1,
  requestFilterNotes: {
    date: [null, null],
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
 * ## [Экшин] Установить дату для фильтра
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setDateFilter = (
  state: InitialState,
  { payload }: PayloadAction<RequestFilterNotes>,
): InitialState => ({
  ...state,
  requestFilterNotes: payload,
});

/**
 * ## [Экшин] Установить общее количество элементов
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setTotalCount = (
  state: InitialState,
  { payload }: PayloadAction<TotalCount>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] Установить номер текущей страницы
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setCurrentPage = (
  state: InitialState,
  { payload }: PayloadAction<CurrentPage>,
): InitialState => ({
  ...state,
  ...payload,
});

/**
 * ## [Экшин] Установить количество элементов на странице
 *
 * @param {InitialState} state Состояние модуля
 *
 * @returns {void}
 */
const setPageLimit = (
  state: InitialState,
  { payload }: PayloadAction<PageLimit>,
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
    setCurrentPage,
    setTotalCount,
    setPageLimit,
    updateNote,
    clearElemState,
    setDateFilter,
  },
});

export const notesReducer = loginSlice.reducer;
export const actions = {
  ...loginSlice.actions,
  loadingNotesPage: actionLoadingNotesPage,
  loadingNoteDetailPage: actionLoadingNoteDetailPage,
};
