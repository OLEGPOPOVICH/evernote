import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Получаем глобальные настройки приложения
import { config } from '@common/config';

export type ErrorsState = {
  title: string;
  message: string;
  code?: number | string;
} | null;

const initialState: ErrorsState = null;

/**
 * Обработчик установки ошибки
 *
 * @param {ErrorsState} state - Текущее состояние глобальных ошибок
 * @param {PayloadAction<NonNullable<ErrorsState>>} payload - Объект описывающий ошибку
 *
 * @returns {ErrorsState} Новый стейт модуля errors
 */
const toSetError = (
  state: ErrorsState,
  {
    payload: { title, message, code = '' },
  }: PayloadAction<NonNullable<ErrorsState>>,
): ErrorsState => ({
  title,
  message,
  code,
});

/**
 * Сброс состояния до начального
 *
 * @returns {null} Значение по умолчанию для модуля errors
 */
const toClearError = (): ErrorsState => initialState;

const errorsSlice = createSlice({
  name: config.modules.errors,
  initialState,
  reducers: {
    setError: toSetError,
    clearError: toClearError,
  },
});

export const errorsReducer = errorsSlice.reducer;

export const actions = {
  ...errorsSlice.actions,
};
