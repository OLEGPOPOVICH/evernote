import axios from 'axios';
import { uuid4 } from '../strings';

/* eslint-disable  */

/**
 * ## Метод создает и возращает объект axiosInstance
 *
 * @param {string} apiVersion - версия API
 *
 * @returns {AxiosInstance} - объект AxiosInstance
 */
export const createHttpClient = (apiVersion = 'v1') => {
  const axiosInstance = axios.create();

  /**
   * ## Метод для отправки GET-запроса
   *
   * @example
   * get('URL_TO_BACKEND', {params: { search: 'Сбербанк' }});
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const get = ({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    config: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.get(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ## Метод для отправки DELETE-запроса
   *
   * @example
   * deleteReq('URL_TO_BACKEND');
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const deleteReq = ({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    config: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.delete(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ## Метод для отправки HEAD-запроса
   *
   * @example
   * head('URL_TO_BACKEND');
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {AxiosRequestConfig} config - Настройки для запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const head = ({
    url,
    config,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    config: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.head(`${versionStr}/${url}`, {
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      ...config,
    });
  };

  /**
   * ## Метод для отправки POST-запроса
   *
   * @example
   * post('URL_TO_BACKEND', data);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const post = ({
    url,
    data,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    data: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request({
      url: `${versionStr}/${url}`,
      method: 'post',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
    });
  };

  /**
   * ## Метод для отправки PUT-запроса
   *
   * @example
   * put('URL_TO_BACKEND', data,);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - данные запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const put = ({
    url,
    data,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    data: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request({
      url: `${versionStr}/${url}`,
      method: 'put',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
    });
  };

  /**
   * ## Метод для отправки PATCH-запроса
   *
   * @example
   * patch('URL_TO_BACKEND', data);
   *
   * @param {string} url - URL эндпоинта для отправки запроса
   * @param {Array<?Object>} data - Данные запроса
   * @param {string} version - Версия API эндпоинта
   * @param {object} headers - Дополнительные заголовки
   *
   * @returns {AxiosPromise<any>} Результат ответа от сервера
   */
  const patch = ({
    url,
    data,
    version = apiVersion,
    headers = {},
  }: {
    url: string;
    data: any;
    version: any;
    headers: any;
  }) => {
    const versionStr = version ? `api/${version}` : '';
    return axiosInstance.request({
      url: `${versionStr}/${url}`,
      method: 'patch',
      headers: {
        'x-ruid': uuid4(),
        ...headers,
      },
      data,
    });
  };

  /**
   * @ignore
   */
  return {
    get,
    delete: deleteReq,
    head,
    post,
    put,
    patch,
  };
};

/* eslint-enable  */
