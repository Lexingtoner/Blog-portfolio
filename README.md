# Portfolio Blog

Полнофункциональное веб-приложение портфолио с интерактивными функциями, построенное с использованием современных технологий.

## 🎯 Функции

### 🚀 Основной функционал

- **Портфолио проектов** - Описание, ссылки и статус проектов
- **Технологический стек** - Детальное описание используемых технологий
- **Контактная информация** - Быстрая связь с автором
- **Интерактивный терминал** - Выполнение команд в браузере
- **Музыкальный плеер** - Проигрывание музыки Dark Souls 2 - Majula
- **Discord сервер** - Информация о сообществе и правила

### 🔐 Безопасность и аутентификация

- **Clerk Authentication** - Безопасная аутентификация пользователей
- **JWT Tokens** - Защита API endpoints
- **CORS Protection** - Защита от cross-origin атак

### 🎨 Дизайн и UX

- **Адаптивный дизайн** - Работает на мобильных, планшетах и десктопах
- **Темный UI** - Современный темный интерфейс
- **Плавные анимации** - Интерактивные переходы и эффекты

## 📂 Структура проекта

```
portfolio-blog/
├── frontend/                    # Next.js приложение
│   ├── app/
│   │   ├── layout.tsx          # Корневой layout
│   │   ├── page.tsx            # Главная страница
│   │   └── globals.css         # Глобальные стили
│   ├── components/
│   │   ├── Terminal.tsx        # Интерактивный терминал
│   │   ├── MusicPlayer.tsx     # Музыкальный плеер
│   │   ├── Projects.tsx        # Раздел проектов
│   │   ├── TechStack.tsx       # Технологический стек
│   │   ├── Contacts.tsx        # Форма контактов
│   │   ├── Discord.tsx         # Информация Discord
│   │   └── Navigation.tsx      # Навигационное меню
│   ├── lib/
│   │   └── terminalCommands.ts # Команды терминала
│   ├── next.config.js
│   ├── webpack.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                     # NestJS API
│   ├── src/
│   │   ├── auth/               # Модуль аутентификации
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── projects/           # Модуль проектов
│   │   │   ├── projects.controller.ts
│   │   │   ├── projects.service.ts
│   │   │   └── projects.module.ts
│   │   ├── contacts/           # Модуль контактов
│   │   │   ├── contacts.controller.ts
│   │   │   ├── contacts.service.ts
│   │   │   └── contacts.module.ts
│   │   ├── app.module.ts       # Корневой модуль
│   │   └── main.ts             # Точка входа
│   ├── tsconfig.json
│   ├── nest-cli.json
│   ├── package.json
│   └── README.md
│
└── docs/
    └── API.md                  # API документация
```

## 🚀 Быстрый старт

### Требования

- Node.js >= 18.0.0
- npm >= 9.0.0

### Установка и запуск


## ⚙️ Быстрая установка (без Docker)

### 1. Клонируем репозиторий

```bash
git clone https://github.com/username/portfolio-blog.git
cd portfolio-blog
```

### 2. Установка зависимостей

```bash
npm install
```

Это установит зависимости для корневого проекта и обоих workspaces (frontend и backend).

### 3. Настройка переменных окружения

**Для backend (создать `backend/.env`):**

```bash
cp backend/.env.example backend/.env
```

Отредактируйте `backend/.env`:

```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=portfolio_blog
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:3001
```

**Для frontend (создать `frontend/.env.local`):**

```bash
cp frontend/.env.example frontend/.env.local
```

Отредактируйте `frontend/.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Настройка базы данных

Убедитесь, что PostgreSQL установлена и запущена:

```bash
# Linux/Mac
brew services start postgresql

# Windows
# Запустите PostgreSQL из Services или используйте Docker
```

Создайте базу данных:

```bash
psql -U postgres -c "CREATE DATABASE portfolio_blog;"
```

### 5. Запуск приложения

```bash
# Запуск фронтенда и бэкенда одновременно
npm run dev

# Или отдельно:
npm run frontend:dev    # Frontend: http://localhost:3000
npm run backend:dev     # Backend: http://localhost:3001
```

Откройте браузер:

- 🎨 Frontend: <http://localhost:3000>
- 📚 API Docs: <http://localhost:3001/api/docs>


1. **Клонируем репозиторий**

```bash
git clone https://github.com/username/portfolio-blog.git
cd portfolio-blog
```

1. **Установка зависимостей**

```bash
npm install
```

1. **Создание файлов `.env`**

Frontend (`.env.local`):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Backend (`.env`):

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=portfolio_blog
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

1. **Запуск приложения**

```bash
# Запуск фронтенда и бэкенда одновременно
npm run dev

# Или отдельно:
npm run frontend:dev  # Frontend на http://localhost:3000
npm run backend:dev   # Backend на http://localhost:3001
```

## 📚 API Документация

### Endpoints

#### Authentication

- `POST /api/auth/login` - Вход пользователя
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/logout` - Выход

#### Projects

- `GET /api/projects` - Получить все проекты
- `POST /api/projects` - Создать проект

#### Contacts

- `POST /api/contacts` - Отправить сообщение
- `GET /api/contacts` - Получить все сообщения

#### Swagger документация

```
http://localhost:3001/api/docs
```

## 🎮 Команды интерактивного терминала

```
help           - Показать справку
about          - Информация о портфолио
skills         - Список навыков
projects       - Список проектов
contact        - Контактная информация
whoami         - Текущий пользователь
date           - Текущая дата и время
echo <text>    - Повторить текст
repo           - GitHub репозиторий
api-status     - Статус API
weather        - Погода
```

## 🛠️ Используемые технологии

### Frontend

- **Next.js 14** - React фреймворк
- **React 18** - UI библиотека
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Утилит-фёрст CSS
- **Clerk** - Аутентификация
- **Axios** - HTTP клиент

### Backend

- **NestJS** - Node.js фреймворк
- **TypeScript** - Типизированный JavaScript
- **TypeORM** - ORM для баз данных
- **PostgreSQL** - Основная БД
- **JWT** - Аутентификация
- **Swagger** - API документация

### DevOps & Tools

- **Docker** - Контейнеризация
- **Webpack** - Бандлер модулей
- **ESLint** - Линтер кода
- **Git** - Контроль версий

## 📖 Дополнительные ресурсы

- [Next.js документация](https://nextjs.org/docs)
- [NestJS документация](https://docs.nestjs.com)
- [Clerk документация](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Внесение вклада

Приветствуются pull requests. Для больших изменений сначала откройте issue для обсуждения.

## 📝 Лицензия

MIT

## 👨‍💻 Автор

Создано как демонстрационный проект с использованием современного стека технологий.

---

**Контакты:**

- Email: <contact@example.com>
- Telegram: @username
- GitHub: github.com/username
- Discord: GameCommunity#1234
