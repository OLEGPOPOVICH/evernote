import { createSlice } from '@reduxjs/toolkit';

// Получаем глобальные настройки приложения
import { getConfig } from '@common/config';

const initialState: any = null;

/**
 * Обработчик установки ошибки
 *
 * @param {null|object} state - Текущее состояние глобальных ошибок
 * @param {object} payload - Объект описывающий ошибку
 *
 * @returns {object} Новый стейт модуля errors
 */
const toSetError = (
  state: any,
  {
    payload: { title, message, code = '' },
  }: { payload: { title: string; message: string; code: string } },
) => ({
  title,
  message,
  code,
});

/**
 * Сброс состояния до начального
 *
 * @returns {null} Значение по умолчанию для модуля errors
 */
const toClearError = () => initialState;

const errorsSlice = createSlice({
  name: getConfig('modules.errors'),
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
