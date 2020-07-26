import { createSelector } from '@reduxjs/toolkit';
import { isNil, not, pathOr } from 'ramda';

import { getConfig } from '@common/config';

const errorsSelector = (state: any) =>
  pathOr(null, [getConfig('modules.errors')], state);

/**
 * ## [Селектор] Есть ли глобальная ошибка
 */
const isErrorExist = createSelector(errorsSelector, (errors) =>
  not(isNil(errors)),
);

/**
 * ## [Селектор] Получить заголовок ошибки
 */
const errorTitle = createSelector(errorsSelector, (error) =>
  pathOr('', ['title'], error),
);

/**
 * ## [Селектор] Получить заголовок ошибки
 */
const errorMessage = createSelector(errorsSelector, (error) =>
  pathOr('', ['message'], error),
);

/**
 * ## [Селектор] Получить код ошибки
 */
const errorCode = createSelector(errorsSelector, (error) =>
  pathOr('', ['code'], error),
);

export const selectors = {
  isErrorExist,
  errorTitle,
  errorMessage,
  errorCode,
};
