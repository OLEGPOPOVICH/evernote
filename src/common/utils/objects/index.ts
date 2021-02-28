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
 * @param {T} dafaultValue - дефолтное значение, если свойства не найдено
 * @param {Path} path - массив цепочки
 * @param {object} obj - объект, на котором хотим вызвать цепочку
 *
 * @returns {T} найденное свойство по цепочке или дефолтовое значение
 */
export const pathOr = <T>(dafaultValue: T, path: Path, obj: ObjectProps): T =>
  pathOrRamda(dafaultValue, path, obj);
