# Portfolio Blog Backend

Backend API для приложения Portfolio Blog, построенное на NestJS.

## 🚀 Особенности

- **NestJS Framework** - Прогрессивный Node.js фреймворк для построения эффективных, надежных и масштабируемых серверных приложений
- **TypeScript** - Строгая типизация для повышения безопасности и качества кода
- **JWT Authentication** - Безопасная аутентификация на основе JWT токенов
- **Swagger/OpenAPI** - Автоматическая документация API
- **CORS** - Поддержка cross-origin запросов для фронтенда
- **Validation Pipes** - Автоматическая валидация входящих данных

## 📦 Установка зависимостей

```bash
npm install
# или
yarn install
```

## 🔧 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=portfolio_blog

# JWT
JWT_SECRET=your-secret-key-here

# CORS
CORS_ORIGIN=http://localhost:3001
```

## 🏃 Запуск приложения

```bash
# Development режим с hot reload
npm run dev

# Production режим
npm run build
npm start

# Отладка
npm run debug
```

## 📚 API Endpoints

### Authentication (`/api/auth`)

- `POST /login` - Вход пользователя
- `POST /register` - Регистрация нового пользователя
- `POST /logout` - Выход пользователя

### Projects (`/api/projects`)

- `GET /` - Получить все проекты
- `POST /` - Создать новый проект

### Contacts (`/api/contacts`)

- `POST /` - Отправить сообщение с контактной формы
- `GET /` - Получить все сообщения контактов

## 📖 Документация

Swagger документация доступна по адресу:

```text
http://localhost:3001/api/docs
```

## 🏗️ Архитектура

```text
src/
├── auth/          # Аутентификация и авторизация
├── projects/      # Управление проектами
├── contacts/      # Управление контактными сообщениями
├── app.module.ts  # Корневой модуль приложения
└── main.ts        # Точка входа приложения
```

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов с coverage
npm test:cov

# Watch режим
npm test:watch
```

## 🐳 Docker

```bash
# Создание образа
docker build -t portfolio-blog-backend .

# Запуск контейнера
docker run -p 3001:3001 --env-file .env portfolio-blog-backend
```

## 📝 Стек технологий

- **NestJS** - Web framework
- **TypeScript** - Programming language
- **TypeORM** - Object Relational Mapping
- **PostgreSQL** - Primary database
- **MongoDB** - Optional database
- **JWT** - Authentication
- **Swagger** - API documentation

## 🔒 Безопасность

- JWT токены для аутентификации
- Валидация входящих данных
- CORS настройки
- Обработка ошибок
- Rate limiting готов к внедрению

## 📝 Лицензия

MIT
