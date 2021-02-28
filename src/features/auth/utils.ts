import { pathOr } from '@common/utils';
import { TokenData } from './types';

/**
 * ## Проверяем, не кончилось ли время жизни токена
 *
 * @param {object} tokenData Объект данных токена:
 * @param {string} email Емеил пользователя
 * @param {string} password Пароль пользователя
 * @param {number} exp Время жизни токена
 * @param {number} iat Время создания токена
 *
 * @returns {[boolean, number]} состояние токена
 */
const getTokenExp = (tokenData: TokenData): [boolean, number] => {
  const expToken: number = pathOr(0, ['exp'], tokenData);
  const nowTime: number = Date.now();
  const delayTime: number = expToken * 1000 - nowTime;

  if (delayTime > 0) {
    return [true, delayTime];
  }

  return [false, 0];
};

export const utils = {
  getTokenExp,
};
