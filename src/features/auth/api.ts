import axios from 'axios';

/**
 * Авторизация
 *
 * @param {Object} data - Параметры для авторизации
 *
 * @returns {Boolean} - Состояние авторизации
 */
const login = (data: unknown) =>
  axios.get('http://localhost:3001/users').then((resp: any) => {
    const users = resp.data;
    return users.some(
      (user: any) => JSON.stringify(user) === JSON.stringify(data),
    );
  });

export const api = {
  login,
};
