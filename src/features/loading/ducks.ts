import { createSlice } from '@reduxjs/toolkit';

// Получаем глобальные настройки приложения
import { getConfig } from '@common/config';

const initialState = {
  isLoading: false,
  isGlobal: false,
};

/**
 * Установка значения лоадера
 *
 * @param {object} state - Текущее состояние лоадера
 * @param {object} payload - Полезная нагрузка
 *
 * @returns {object} Новое значение состояние глобального лоадера
 */
const toSetLoading = (state: any, { payload }: { payload: any }) => ({
  ...state,
  ...payload,
});

const loadingSlice = createSlice({
  name: getConfig('modules.loading'),
  initialState,
  reducers: {
    setLoading: toSetLoading,
  },
});

export const loadingReducer = loadingSlice.reducer;

export const actions = {
  ...loadingSlice.actions,
};
