import { includes, pathOr } from 'ramda';

/**
 * ## Метод возвращает новый метод который проверяет, есть ли значение в ключе объекта
 *
 * @param {Object} hash - Объект ключ-массив
 * @returns {Function} метод который проверяет, есть ли значение в массиве
 */
export const includeIn = (hash: any) => (value: any, path: any) => {
  const includesList = pathOr([], path, hash);
  return includes(value, includesList);
};
