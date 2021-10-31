/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path, pathOr as pathOrRamda } from 'ramda';

type ObjectProps = {
  [key: string]: any;
};

/**
 * ### Метод получения глубоко вложенного свойства
 *
 * @example
 * const isProcessed: pathOr(true, ['isProcessed'], auth),
 *
 * @param {T} dafaultValue дефолтное значение, если свойства не найдено
 * @param {Path} path массив цепочки
 * @param {object} obj объект, на котором хотим вызвать цепочку
 *
 * @returns {T} найденное свойство по цепочке или дефолтовое значение
 */
export const pathOr = <T>(dafaultValue: T, path: Path, obj: ObjectProps): T =>
  pathOrRamda(dafaultValue, path, obj);

/**
 * ### Метод возврвщает query-params в виде строки
 *
 * @param {ObjectProps} objList query-params в виде объекта
 *
 * @returns {string} query-params в виде строки
 */
export const objsToQueryParams = (objList: ObjectProps): string => {
  const queryStr = Object.keys(objList).reduce((query, key, index) => {
    let qStr = query;
    qStr += `${key}=${objList[key]}`;

    if (objList.length > 1 && index + 1 < objList.length) {
      qStr += '&';
    }

    return qStr;
  }, '');

  return queryStr ? `?${queryStr}` : '';
};
