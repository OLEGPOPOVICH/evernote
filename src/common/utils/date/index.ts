import moment from 'moment';

type DateFormat = {
  date: any;
  format: string;
  locale?: string;
};

/**
 * ## Привести дату к формату
 *
 * @example
 * Источник: https://momentjs.com/
 *
 * date: new Date()
 * format: 'dddd, DD.MM.YYYY, HH:mm:ss'
 * locale: 'en',
 *
 * dateFormat({data, format, locale}) / Sunday, 28.02.2021, 20:05:38
 *
 *
 * @param {any} date текущая дата
 * @param {string} format формат даты
 * @param {string} locale локаль (default locale: 'ru')
 *
 * @returns {string} дата
 */
export const dateFormat = ({
  date,
  format,
  locale = 'ru',
}: DateFormat): string => moment(date).locale(locale).format(format);
