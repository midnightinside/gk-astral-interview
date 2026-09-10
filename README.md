# gk-astral-interview

Тестовое задание на позицию Frontend-разработчика (ГК «Астрал»).

SPA для изучения иностранных слов: карточки слов, авторизация и форма
редактирования профиля.

## Стек

| Область         | Решение                                        |
| --------------- | ---------------------------------------------- |
| Ядро            | React 19, TypeScript 5.8, Vite 6               |
| Состояние       | Redux Toolkit, react-redux                     |
| Роутинг         | react-router-dom 7                             |
| Стилизация      | @emotion/styled                                |
| Формы           | react-hook-form, @astral/validations            |
| Работа с сетью  | axios, axios-retry                             |
| Линтер/формат   | Biome + @astral/biomejs-config                 |
| Git-хуки        | husky, lint-staged, @astral/commitlint-config   |

Набор инструментов повторяет актуальный стек Астрала: конфигурация линтера,
коммитлинта и структура проекта взяты из их публичных пакетов и гайдов.

## Запуск

```bash
npm install
npm run dev
```

Приложение поднимется на http://localhost:5173.

## Скрипты

| Команда              | Назначение                                  |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Дев-сервер Vite                             |
| `npm run build`      | Продакшен-сборка                            |
| `npm run preview`    | Локальный просмотр собранной версии         |
| `npm run lint`       | Biome: проверка и автоисправление           |
| `npm run lint:all`   | Biome по всем правилам, включая нестрогие   |
| `npm run lint:types` | Проверка типов через `tsc --noEmit`         |

## Переменные окружения

Скопируйте `.env.example` в `.env`:

```bash
cp .env.example .env
```

| Переменная          | Назначение                                             |
| ------------------- | ------------------------------------------------------ |
| `VITE_API_BASE_URL` | Базовый URL мок-API. Пустое значение — работа на локальных фикстурах |

## Формат коммитов

Проект использует `@astral/commitlint-config`: `type(scope): Description`.
Описание начинается с заглавной буквы, без точки в конце.

```
feat: Add card flip animation
chore(TEST-101): Update biome config
```

Доступные типы: `feat`, `bug`, `wip`, `refactor`, `doc`, `build`, `chore`,
`revert`, `style`, `test`, `major`, `story`.
