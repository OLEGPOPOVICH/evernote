import { pathOr, split } from 'ramda';

export const config = {
  maxFileSize: 11000,
  modules: {
    errors: 'errors' as const,
    loading: 'loading' as const,
    notices: 'notices' as const,
    router: 'router' as const,
  },
  environment: process.env.NODE_ENV,
  defaultDelay: 2000,
};

/**
 * Метод возвращает значение конфига или значение по умолчанию
 *
 * @param {string} settingPath - Путь к настроек в стиле path/to/need/config
 * @param {any} defaultValue - Значение по умолчанию
 * @param {string} separator - Разделитель для пути
 *
 * @returns {any} Значение настройки либо значение по-умолчанию
 */
export const getConfig = <T>(
  settingPath: string,
  defaultValue: T = null,
  separator = '.',
): T => pathOr(defaultValue, split(separator, settingPath), config);
