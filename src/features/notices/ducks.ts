import { createSlice } from '@reduxjs/toolkit';

import { getConfig } from '@common/config';

const initialState: any[] = [];

const toPushNotice = (_: any, { payload }: { payload: any }) => [payload];

const toClearNotices = () => initialState;

const noticeSlice = createSlice({
  name: getConfig('modules.notices'),
  initialState,
  reducers: {
    pushNotice: toPushNotice,
    clearNotices: toClearNotices,
  },
});

export const noticeReducer = noticeSlice.reducer;

export const actions = {
  ...noticeSlice.actions,
};
