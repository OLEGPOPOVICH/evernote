import { compose, head, tail, toLower, toUpper } from 'ramda';
import { v4 } from 'uuid';

/**
 * ### Метод преобразования первого символа строки в верхний регистр
 *
 * @example
 * const str = 'тестовая строка';
 * const newStr = toCapitalize(str); // Тестовая строка
 *
 * @param {string} str - Преобразуемая строка
 *
 * @return {string} Строка с преобразованными первым символом
 */
export const toCapitalize = compose(
  ({ firstLetter, tailString }) =>
    `${toUpper(firstLetter)}${toLower(tailString)}`,
  (_: string) => ({ firstLetter: head(_), tailString: tail(_) }),
);

/**
 * ### Метод генерации guid
 *
 * @returns {string} guid
 */
export const uuid4 = (): string => v4().split('-').join('');

/**
 * ### Метод переводит массив байт в base64
 *
 * @param {Array<number>} arrayBytes - Массив байт
 *
 * @returns {string} - Строка в base64
 */
export const base64FromArray = (arrayBytes: number[]): string =>
  String.fromCharCode.apply(null, arrayBytes);

/**
 * ### Метод удаляет пробельные символы с начала и конца строки
 *
 * @param {string} str - строка оригинал
 * @returns {string} срока без пробельных символов в начале и конце строки
 */
export const trim = (str: string): string => str.trim();

/**
 * ### Метод обрезает строку по заданному количеству символов
 *
 * @param {string} str - строка оригинал
 * @param {number} limit - кол-во символов
 * @returns {string} обрезанная строка по заданному количеству символов
 */
export const trimString = (str: string, limit?: number): string => {
  let newStr = str;

  if (limit) {
    newStr = `${str.substring(0, limit)}...`;
  }

  return newStr;
};

/**
 * ### Метод разбивает строку на массив строк путем разделения строки указанной подстрокой
 *
 * @param {string} str - строка оригинал
 * @param {string} separator - используется в качестве разделителя строки
 * @returns {Array<string>} массив строк
 */
export const split = (str: string, separator: string): Array<string> =>
  str.split(separator);
