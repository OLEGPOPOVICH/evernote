import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

import { config } from '@common/config';
import { pathOr } from '@common/utils';

import { InitialState } from './ducks';
import { ActiveTagType, NotesType, NoteType } from './types';

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
    note: pathOr({}, ['note'], notes),
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

export const selectors = {
  getNotes,
  getNote,
  getActiveTag,
};
