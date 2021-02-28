import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

import { config } from '@common/config';
import { pathOr } from '@common/utils';

import { InitialState } from './ducks';
import { NotesType } from './types';

/**
 * ## [Селектор] Данные по заметкам
 */
const notesSelector = (state: RootState): InitialState =>
  state[config.modules.notes];

/**
 * ## [Селектор] Список заметок
 */
const getNotes = createSelector(
  notesSelector,
  (notes: InitialState): NotesType => ({
    notes: pathOr([], ['notes'], notes),
  }),
);

export const selectors = {
  getNotes,
};
