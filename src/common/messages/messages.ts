/* eslint-disable prettier/prettier */
const createUiMessages = () => ({
  btnSubmit: 'Отправить',
  btnCancel: 'Отменить',
  btnLogin: 'Войти',
  labelLogin: 'Логин',
  labelPassword: 'Пароль',
  titleAuthlogin: 'Войти в профиль',
  requestAccessError: {
    title: 'Ошибка доступа',
    message: 'У вас нет прав на просмотр данного ресурса',
  },
  requestError: {
    incorrectLoginOrPassword: 'Введен неправильный логин или пароль!',
  },
  modalText: (txt: string): string => `Получение текста сообщения ${txt}`,
  serverError: (code: number) => ({
    title: 'Ошибка сервера',
    message: 'Попробуйте воспользоваться сервисом позже',
    code,
  }),
});

/**
 * Сообщение для вывода на UI
 */
export const uiMessages: Readonly<
  ReturnType<typeof createUiMessages>
> = createUiMessages();
