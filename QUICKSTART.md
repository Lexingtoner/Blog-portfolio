# 🚀 Быстрый старт - Portfolio Blog

Этот документ содержит инструкции по быстрому запуску приложения Portfolio Blog.

## 📋 Требования

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Docker & Docker Compose** (опционально, для контейнеризации)
- **PostgreSQL** >= 12 (если запускать локально без Docker)

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

---

## 🐳 Установка с Docker

### 1. Подготовка

```bash
git clone https://github.com/username/portfolio-blog.git
cd portfolio-blog
```

### 2. Создание файла .env

```bash
cp backend/.env.example .env
```

Отредактируйте `.env` с необходимыми значениями.

### 3. Запуск контейнеров

```bash
# Запуск всех сервисов
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

Приложение будет доступно на:

- 🎨 Frontend: <http://localhost:3000>
- 📚 Backend API: <http://localhost:3001>
- 🛠️ Adminer (Database UI): <http://localhost:8080>
- 📚 API Docs: <http://localhost:3001/api/docs>

### 4. Управление контейнерами

```bash
# Просмотр запущенных контейнеров
docker-compose ps

# Просмотр логов конкретного сервиса
docker-compose logs backend
docker-compose logs frontend

# Перезапуск сервиса
docker-compose restart backend

# Пересборка образов
docker-compose build

# Удаление всех контейнеров и volume
docker-compose down -v
```

---

## ✅ Проверка работы

### Фронтенд

Откройте <http://localhost:3000> и проверьте:

- ✅ Страница загружается без ошибок
- ✅ Навигационное меню видимо
- ✅ Музыкальный плеер работает
- ✅ Интерактивный терминал работает

### Backend API

```bash
# Получить все проекты
curl http://localhost:3001/api/projects

# Отправить тестовый контакт
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Hello, this is a test!"
  }'

# Просмотреть Swagger документацию
# Откройте http://localhost:3001/api/docs в браузере
```

---

## 🔧 Полезные команды

```bash
# Установка зависимостей
npm install

# Запуск только frontend
npm run frontend:dev

# Запуск только backend
npm run backend:dev

# Build для production
npm run build

# Запуск production версии
npm start

# Проверка типов TypeScript
npm run type-check

# Линтинг кода
npm run lint

# Очистка node_modules и dist папок
npm run clean
```

---

## 📝 Структура файлов

```
portfolio-blog/
├── frontend/              # Next.js приложение
├── backend/               # NestJS API
├── docs/                  # Документация
├── package.json           # Root package.json
├── docker-compose.yml     # Docker Compose конфигурация
├── .gitignore
└── README.md
```

---

## 🐛 Решение проблем

### Порты уже заняты

Если порты 3000 или 3001 уже заняты:

```bash
# Найти процесс на порте
lsof -i :3000
lsof -i :3001

# Убить процесс
kill -9 <PID>

# Или использовать разные порты в .env
PORT=3002  # для backend
```

### PostgreSQL не подключается

```bash
# Проверить статус PostgreSQL
psql -U postgres -h localhost

# Проверить параметры подключения в .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
```

### Node modules не установились правильно

```bash
# Очистить npm кеш
npm cache clean --force

# Переустановить зависимости
rm -rf node_modules package-lock.json
npm install
```

### CORS ошибки

Убедитесь, что в `backend/.env` установлено:

```env
CORS_ORIGIN=http://localhost:3000
```

И в `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📚 Дополнительные ресурсы

- [Next.js документация](https://nextjs.org/docs)
- [NestJS документация](https://docs.nestjs.com)
- [Docker документация](https://docs.docker.com)
- [Clerk документация](https://clerk.com/docs)

---

## 🤝 Внесение изменений

При развитии проекта:

```bash
# Создать новую ветку
git checkout -b feature/my-feature

# Сделать изменения и коммитить
git add .
git commit -m "Add my feature"

# Push в репозиторий
git push origin feature/my-feature

# Создать Pull Request
```

---

## 📞 Поддержка

Если у вас возникли проблемы:

1. Проверьте логи приложения
2. Посмотрите документацию в `/docs`
3. Проверьте примеры в README
4. Создайте Issue на GitHub

Email: <contact@example.com>
GitHub: <https://github.com/username/portfolio-blog>

---

## 🎉 Готово

Приложение должно работать. Начните разработку и добавляйте свои функции!
