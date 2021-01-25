=== шаблон readme проекта ===

=== [readme для статового проекта](http://git.esphere.local/Golomazov.AV/react-start/blob/master/README.md) ===

# Заготовка под проект на react-redux стеке

Репозиторий проекта: [GitLab](http://git.esphere.local/myProject)

- [Описание](#описание)
- [Технологии проекта](#технологии-проекта)
- [Кодстайл](#кодстайл)
- [Разработка](#разработка)
- [Структура проекта](#структура-проекта)
- [Версионирование](#версионирование)
- [Работа с гитом](#работа-с-гитом)
- [Контакты](#контакты)

### Описание

=== Описание проекта

### Технологии проекта

- [React](https://ru.reactjs.org/)
- [Redux](https://redux.js.org/)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [Redux-saga](https://redux-saga.js.org/)
- [React-router-dom](https://reactrouter.com/web/guides/quick-start)
- [connected-react-router](https://github.com/supasate/connected-react-router/)
- [history](https://github.com/ReactTraining/history)
- [Ramda](https://ramdajs.com/)
- [Moment](https://momentjs.com/)
- [Jest](https://jestjs.io/)
- CSS ([styles-esphere](https://ui-dev.esphere.ru/#/uikit/guide/programmer))
- [Leda3.x](https://leda.esphere.ru/)

### Кодстайл

За основу взят [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#airbnb-javascript-style-guide-).

Дополнения и уточнения смотрите в [confluence](https://confluence.esphere.ru/pages/viewpage.action?pageId=103693109).

### Разработка

- [Запуск проекта](#Запуск-проекта)
- [Стенды](#Стенды)
- [NPM скрипты](#npm-скрипты)
- [Swagger](#swagger)

### Запуск проекта

```javascript
npm i
```

```javascript
npm start
```

```javascript
http://localhost:3000/#/
```

=== опишите здесь дальнейшие шаги для запуска проекта (копирование кук, и т.п.)

### Стенды

Проект доступен на стендах:

| Тип стенда              | Ссылка на стенд          |
| :---------------------- | ------------------------ |
| Стенд для разработчиков | https://dev.esphere.ru/  |
| Тестовый                | https://tst.esphere.ru/  |
| ИФТ                     | https://ift.esphere.ru/  |
| ПСИ                     | https://psi.esphere.ru/  |
| ПРОМ                    | https://prom.esphere.ru/ |

### NPM скрипты

| Скрипт        | Описание                                                                                            |
| :------------ | --------------------------------------------------------------------------------------------------- |
| npm run start | запуск проекта на http://localhost:3000/#/                                                          |
| npm run build | сборка проекта с настройками для прода, не будет выполнено, если не пройдёт проверка `npm run lint` |
| npm run lint  | проверка кода проекта на ошибки eslint                                                              |
| npm run test  | запуск тестов                                                                                       |

### Swagger

=== Здесь ссылка на swagger

### Структура проекта

```
+---src
|   +---common                                                : ОБЩИЕ ЭЛЕМЕНТЫ ПРИЛОЖЕНИЯ
|   |   +---components                                          : общие компоненты
|   |   +---config                                              : общие настройки
|   |   +---errors                                              : обработчики ошибок
|   |   +---layouts                                             : общие макеты
|   |   +---messages                                            : папка с ui-текстовками
|   |   +---styles                                              : папка со стилями приложения
|   |   \---utils                                               : общие утилиты приложения
|   |
|   +---features                                              : МОДУЛИ Проекта
|   |   +---contracts                                           : модуль "Мои договоры"
|   |   +---errors                                              : модуль обработки ошибок
|   |   +---loading                                             : модуль лоадера
|   |
|   |
|   +---pages                                                 : КОМПОНЕНТЫ СТРАНИЦ
|   |
|   +---processes                                             : БИЗНЕС ЛОГИКА ПРИЛОЖЕНИЯ
|   |   \---situations                                          : Бизнес логика по каждой ЖС
|   |
|   \---store                                                 : НАСТРОЙКИ REDUX
```

### Версионирование

Версии проекта следуют за нумерацией спринтов и релизами.

Например: `0.1.2`.

0 - номер основной версии

1 - номер спринта

2 - номер патча

### Ведение Changelog'а

Для ведения журнала изменений используется утилита change-gen, в первую очередь необходимо настроить ее
под ваш проект. Более подробно можно узнать на странице в [confluence](https://confluence.esphere.ru/pages/viewpage.action?pageId=153275826)

### Работа с гитом

В проекте используется [Gitflow](https://confluence.esphere.ru/display/Frontend/Git+Flow)

Ветка для выкладки на тестовый стенд: `master`

Ветка для выкладки на предпромышленный стенд: `master`

Ветка для выкладки на промышленный стенд: `master`

### Названия веток

**Названия feature-веток** формируются из названия `feature/FEND-****`, где `****` id задачи в jira.

Например: `feature/FEND-500`

**Название bugfix-веток** Формируется из названия `bugfix/FEND-****`, где `****` id задачи в jira.

Например: `bugfix/FEND-501`

**Название chore-веток** Формируется из названия `chore/FEND-****`, где `****` id задачи в jira.

Например: `chore/FEND-502`

**Название docs-веток** Формируется из названия `docs/FEND-****`, где `****` id задачи в jira.

Например: `docs/FEND-503`

**Названия релизных веток** формируются из `release/{major}.{minor}.{patch}` которая готовится к релизу.

Например: `release/0.3.0` - релизная ветка третьего спринта.

### Формирование сообщений в коммитах

Сообщение в коммите начинается с кода задачи, например: `[FEND-500]: Добавлен модуль авторизации`.

### Нейминг для MR

#### **feature ветки**

- Добавляем новый функционал: `[FEND-505]: Добавлена возможность просмотра документов`
- Обновляем старый функционал: `[FEND-506]: Обновлена статусная модель документов`

#### **bugfix ветки**

- Исправляем баг: `[FEND-507]: Исправлена ошибка скрипта`

#### **chore ветки**

- Обновили пакет: `[FEND-508]: Обновлена библиотека "korus-ui"`
- Если нет задачи: `[NO-TASK]: Обновлена библиотека "korus-ui"`

#### **docs ветки**

- Обновлен changelog: `[FEND-509]: Обновлен changelog`

### Влитие MR'ов

При влитии своей ветки в `develop` необходимо сквошить коммиты

### Контакты

- Имя Фамилия (mail@esphere.ru)
