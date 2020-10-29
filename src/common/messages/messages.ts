import { getByKey } from '@common/utils';

export const uiMessages = {
  btnSubmit: 'Отправить',
  btnCancel: 'Отменить',
  requestAccessError: {
    title: 'Ошибка доступа',
    message: 'У вас нет прав на просмотр данного ресурса',
  },
  modalText: (txt: string): string => `Получение текста сообщения ${txt}`,
};

/**
 * Метод возвращает сообщение для вывода на UI
 *
 * @returns {string|object|function|any}
 */
export const getUiMessages = getByKey(uiMessages, '');
