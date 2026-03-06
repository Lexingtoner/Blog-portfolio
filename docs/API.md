# API Документация - Portfolio Blog

## Базовая информация

**Base URL:** `http://localhost:3001/api`

**Версия:** 1.0.0

## Authentication

Приложение использует JWT токены для аутентификации. Токен передается в заголовке:

```
Authorization: Bearer <your_token_here>
```

## Endpoints

### 🔐 Authentication (`/auth`)

#### POST /auth/login

Вход пользователя в систему

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "user@example.com"
  }
}
```

#### POST /auth/register

Регистрация нового пользователя

**Request:**

```json
{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:** `201 Created`

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "new-user-123",
    "email": "newuser@example.com"
  }
}
```

#### POST /auth/logout

Выход пользователя из системы

**Response:** `200 OK`

```json
{
  "message": "Logout successful"
}
```

---

### 🚀 Projects (`/projects`)

#### GET /projects

Получить список всех проектов

**Response:** `200 OK`

```json
[
  {
    "id": "1",
    "title": "Portfolio Blog",
    "description": "Full-stack веб-приложение с фронтенд на Next.js и бэкенд на NestJS",
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/username/portfolio-blog"
      },
      {
        "label": "Demo",
        "url": "https://portfolio-blog-demo.com"
      }
    ],
    "status": "in-progress",
    "tags": ["Next.js", "NestJS", "TypeScript", "React"]
  },
  {
    "id": "2",
    "title": "E-Commerce Platform",
    "description": "Платформа для электронной коммерции с интеграцией платежей",
    "links": [
      {
        "label": "GitHub",
        "url": "https://github.com/username/ecommerce"
      }
    ],
    "status": "completed",
    "tags": ["React", "Node.js", "MongoDB", "Stripe"]
  }
]
```

#### POST /projects

Создать новый проект (требует аутентификацию)

**Request:**

```json
{
  "title": "New Amazing Project",
  "description": "Description of the project",
  "status": "in-progress",
  "tags": ["React", "Node.js"]
}
```

**Response:** `201 Created`

```json
{
  "id": "new-project-id",
  "title": "New Amazing Project",
  "description": "Description of the project",
  "status": "in-progress",
  "tags": ["React", "Node.js"],
  "createdAt": "2026-01-16T10:30:00Z"
}
```

---

### 📧 Contacts (`/contacts`)

#### POST /contacts

Отправить сообщение через контактную форму

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to discuss a collaboration opportunity..."
}
```

**Response:** `201 Created`

```json
{
  "id": "contact-123",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I would like to discuss a collaboration opportunity...",
  "createdAt": "2026-01-16T10:30:00Z"
}
```

#### GET /contacts

Получить все сообщения контактов (требует аутентификацию админа)

**Response:** `200 OK`

```json
[
  {
    "id": "contact-123",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I would like to discuss a collaboration opportunity...",
    "createdAt": "2026-01-16T10:30:00Z"
  }
]
```

---

## Error Responses

Все ошибки возвращаются в следующем формате:

```json
{
  "statusCode": 400,
  "message": "Error message here",
  "error": "Bad Request"
}
```

### Коды ошибок

| Код | Описание | 
|-----|----------|
| `400` | Bad Request - Неверный формат запроса |
| `401` | Unauthorized - Требуется аутентификация |
| `403` | Forbidden - Доступ запрещен |
| `404` | Not Found - Ресурс не найден |
| `422` | Unprocessable Entity - Ошибка валидации |
| `500` | Internal Server Error - Ошибка сервера |

## Rate Limiting

API имеет следующие ограничения:

- **Общие endpoints**: 100 запросов в час
- **Authentication endpoints**: 10 запросов в час
- **File upload**: 50 файлов в час

---

## CORS Headers

Приложение использует следующие CORS заголовки:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

## Examples

### Пример использования с cURL

```bash
# Получить все проекты
curl -X GET http://localhost:3001/api/projects

# Отправить сообщение контакта
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'

# Вход
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Пример использования с JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// Получить проекты
async function getProjects() {
  try {
    const response = await api.get('/projects');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Отправить сообщение контакта
async function submitContact(name, email, message) {
  try {
    const response = await api.post('/contacts', {
      name,
      email,
      message,
    });
    console.log('Message sent:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Вход
async function login(email, password) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    const token = response.data.token;
    // Сохранить токен в localStorage
    localStorage.setItem('authToken', token);
    // Добавить токен в заголовки для всех запросов
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Login error:', error);
  }
}
```

---

## Swagger/OpenAPI

Интерактивная документация API доступна по адресу:

```
http://localhost:3001/api/docs
```

Здесь вы можете:

- Просмотреть все endpoints
- Просмотреть примеры запросов и ответов
- Тестировать API прямо из браузера

---

## Versioning

Текущая версия API: **v1**

В будущем планируются новые версии. Все запросы без указания версии используют последнюю доступную версию.

---

## Changelog

### v1.0.0 (2026-01-16)

- ✅ Реализованы endpoints для аутентификации
- ✅ Реализованы endpoints для проектов
- ✅ Реализованы endpoints для контактов
- ✅ Добавлена Swagger документация

---

## Поддержка

Если у вас возникли вопросы или проблемы с API, пожалуйста:

1. Проверьте документацию
2. Посмотрите примеры использования
3. Откройте Issue на GitHub
4. Свяжитесь через контактную форму

Email: <contact@example.com>
GitHub Issues: <https://github.com/username/portfolio-blog/issues>
