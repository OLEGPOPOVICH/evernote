import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

import { config } from '@common/config';
import { pathOr } from '@common/utils';

import { FilterDataNotes, InitialState } from './ducks';
import {
  ActiveTagType,
  CurrentPage,
  NotesType,
  NoteType,
  PageLimit,
  TotalCount,
} from './types';

/**
 * ## [Селектор] Получить данные по заметкам
 */
const notesSelector = (state: RootState): InitialState =>
  state[config.modules.notes];

/**
 * ## [Селектор] Получить сисок заметок
 */
const getNotes = createSelector(
  notesSelector,
  (notes: InitialState): NotesType => ({
    notes: pathOr([], ['notes'], notes),
  }),
);

/**
 * ## [Селектор] Получить заметку
 */
const getNote = createSelector(
  notesSelector,
  (notes: InitialState): NoteType => ({
    note: pathOr(
      {
        id: null,
        title: '',
        desc: '',
        imgUrl: '',
        date: '',
        views: 0,
      },
      ['note'],
      notes,
    ),
  }),
);

/**
 * ## [Селектор] Получить активный тег
 */
const getActiveTag = createSelector(
  notesSelector,
  (notes: InitialState): ActiveTagType => ({
    activeTag: pathOr('', ['activeTag'], notes),
  }),
);

/**
 * ## [Селектор] Получить даннык для фильтрации
 */
const getFilterNotes = createSelector(
  notesSelector,
  (notes: InitialState): FilterDataNotes => ({
    requestFilterNotes: pathOr(
      { date: [null, null] },
      ['requestFilterNotes'],
      notes,
    ),
  }),
);

/**
 * ## [Селектор] Получить номер текущей страницы
 */
const getCurrentPage = createSelector(
  notesSelector,
  (notes: InitialState): CurrentPage => ({
    currentPage: pathOr(1, ['currentPage'], notes),
  }),
);

/**
 * ## [Селектор] Получить количество элементов на странице
 */
const getPageLimit = createSelector(
  notesSelector,
  (notes: InitialState): PageLimit => ({
    pageLimit: pathOr(10, ['pageLimit'], notes),
  }),
);

/**
 * ## [Селектор] Получить общее количество элементов
 */
const getTotalCount = createSelector(
  notesSelector,
  (notes: InitialState): TotalCount => ({
    totalCount: pathOr(0, ['totalCount'], notes),
  }),
);

export const selectors = {
  getNotes,
  getNote,
  getActiveTag,
  getCurrentPage,
  getPageLimit,
  getTotalCount,
  getFilterNotes,
};
