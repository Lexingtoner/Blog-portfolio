# 🏗️ Архитектура Portfolio Blog

## Обзор системы

Portfolio Blog - это полнофункциональное веб-приложение с монолитной архитектурой, разделенной на фронтенд и бэкенд сервисы.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   │ HTTP/HTTPS
                   │ REST API
                   │ JSON
                   │
        ┌──────────▼──────────┐
        │                     │
    ┌───────────┐         ┌──────────┐
    │ Frontend  │◄───────►│ Backend  │
    │ Next.js   │         │ NestJS   │
    └─┬─────────┘         └─┬────────┘
      │                     │
      │ Static Assets       │ Database
      │ Components          │ Business Logic
      │ Pages               │ API Routes
      │                     │
      │                     ▼
      │              ┌────────────────┐
      │              │   PostgreSQL   │
      │              │   MongoDB      │
      │              └────────────────┘
      │
      ▼
  ┌─────────────────┐
  │ Static Files    │
  │ (Vercel/CDN)    │
  └─────────────────┘
```

---

## Frontend архитектура (Next.js)

### Слои приложения

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Layer                 │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Pages (App Router)                           │   │
│  │ - page.tsx (главная страница)                │   │
│  │ - layout.tsx (корневой layout)               │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Components                                   │   │
│  │ - Terminal.tsx                               │   │
│  │ - MusicPlayer.tsx                            │   │
│  │ - Projects.tsx                               │   │
│  │ - TechStack.tsx                              │   │
│  │ - Contacts.tsx                               │   │
│  │ - Discord.tsx                                │   │
│  │ - Navigation.tsx                             │   │
│  │ - CreateProjectForm.tsx                      │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Styling & Assets                             │   │
│  │ - Tailwind CSS                               │   │
│  │ - globals.css                                │   │
│  │ - public/ (images, music)                    │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│               Business Logic Layer                  │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Utilities & Hooks                            │   │
│  │ - lib/api.ts (API клиент)                    │   │
│  │ - lib/terminalCommands.ts (команды)          │   │
│  │ - lib/metadata.ts (SEO)                      │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│                      ▼                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Authentication & State                       │   │
│  │ - Clerk (useUser hook)                       │   │
│  │ - localStorage (tokens)                      │   │
│  │ - Component state (React hooks)              │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│               Integration Layer                     │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ External Services                            │   │
│  │ - API (http://localhost:3001)                │   │
│  │ - Clerk Authentication                       │   │
│  │ - CDN/Vercel (deployment)                    │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Поток данных (Frontend)

```
User Interaction
     │
     ▼
Component (Terminal, MusicPlayer, etc.)
     │
     ├─► setState (React)
     │   │
     │   ▼
     │   Re-render
     │
     ├─► API Call (lib/api.ts)
     │   │
     │   ▼
     │   Backend Response
     │   │
     │   ▼
     │   Update State/localStorage
     │
     └─► Display Updates

```

---

## Backend архитектура (NestJS)

### Модульная архитектура

```
┌──────────────────────────────────────────────────────┐
│                  NestJS Application                  │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ App Module (app.module.ts)                   │   │
│  │ - Imports all feature modules                │   │
│  │ - Configures database                        │   │
│  │ - Registers global providers                 │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│      ┌───────────────┼───────────────┐               │
│      │               │               │               │
│      ▼               ▼               ▼               │
│  ┌─────────┐   ┌─────────┐   ┌──────────┐           │
│  │   Auth  │   │Projects │   │ Contacts │           │
│  │ Module  │   │ Module  │   │  Module  │           │
│  └─────────┘   └─────────┘   └──────────┘           │
│      │               │               │               │
│      ├─►Controller   ├─►Controller   ├─►Controller   │
│      │  (Routes)     │  (Routes)     │  (Routes)     │
│      │               │               │               │
│      ├─►Service      ├─►Service      ├─►Service      │
│      │  (Logic)      │  (Logic)      │  (Logic)      │
│      │               │               │               │
│      └─►Module       └─►Module       └─►Module       │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Shared Infrastructure                        │   │
│  │ - JWT Strategy (Passport)                    │   │
│  │ - Database Configuration (TypeORM)           │   │
│  │ - Global Pipes & Filters                     │   │
│  │ - CORS Configuration                         │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

### Модульная структура

#### Auth Module

```
auth/
├── auth.controller.ts      # Endpoints: login, register, logout
├── auth.service.ts         # JWT управление, валидация
├── auth.module.ts          # Импорт зависимостей
├── strategies/             # Passport strategies
│   ├── jwt.strategy.ts     # JWT стратегия
│   └── local.strategy.ts   # Local стратегия
└── decorators/             # Custom декораторы
    └── auth.decorator.ts   # @Auth() для защиты routes
```

#### Projects Module

```
projects/
├── projects.controller.ts   # GET /api/projects, POST /api/projects
├── projects.service.ts      # CRUD логика
├── projects.module.ts       # Модуль конфигурация
├── entities/                # Database entities
│   └── project.entity.ts    # Project model
└── dto/                     # Data Transfer Objects
    ├── create-project.dto.ts
    └── update-project.dto.ts
```

#### Contacts Module

```
contacts/
├── contacts.controller.ts   # POST /api/contacts, GET /api/contacts
├── contacts.service.ts      # Логика контактов
├── contacts.module.ts       # Модуль конфигурация
├── entities/                # Database entities
│   └── contact.entity.ts    # Contact model
└── dto/                     # Data Transfer Objects
    └── create-contact.dto.ts
```

### Поток запроса (Backend)

```
HTTP Request
     │
     ▼
Middleware (CORS, Validation)
     │
     ▼
Router → Matching Route Pattern
     │
     ▼
Controller → Extract parameters & body
     │
     ├─► Guards (Authentication)
     │
     ├─► Pipes (Validation)
     │   │
     │   ▼
     │   Transform/Validate DTO
     │
     ▼
Service → Execute Business Logic
     │
     ├─► Database Operations (TypeORM)
     │   │
     │   ▼
     │   PostgreSQL/MongoDB
     │
     ▼
Response Serialization
     │
     ▼
HTTP Response (JSON)
```

---

## База данных архитектура

### Entity-Relationship Diagram

```
┌──────────────────────────────────────┐
│           Projects                   │
├──────────────────────────────────────┤
│ id (PK)                              │
│ title: VARCHAR                       │
│ description: TEXT                    │
│ status: ENUM (active, completed...)  │
│ tags: JSON                           │
│ createdAt: TIMESTAMP                 │
│ updatedAt: TIMESTAMP                 │
│ userId (FK) ─────────┐               │
└──────────────────────┼───────────────┘
                       │
                       │ 1..N
                       │
                ┌──────▼───────────────┐
                │       Users          │
                ├──────────────────────┤
                │ id (PK)              │
                │ email: VARCHAR       │
                │ clerkId: VARCHAR     │
                │ firstName: VARCHAR   │
                │ lastName: VARCHAR    │
                │ createdAt: TIMESTAMP │
                │ updatedAt: TIMESTAMP │
                └──────▲───────────────┘
                       │
                       │ 1..N
                       │
┌──────────────────────┴───────────────┐
│           Contacts                   │
├──────────────────────────────────────┤
│ id (PK)                              │
│ name: VARCHAR                        │
│ email: VARCHAR                       │
│ message: TEXT                        │
│ status: ENUM (new, read...)          │
│ createdAt: TIMESTAMP                 │
│ userId (FK, optional)                │
└──────────────────────────────────────┘
```

### Таблицы

```sql
-- Users (управляется Clerk, но можно хранить локально)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  clerkId VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  firstName VARCHAR,
  lastName VARCHAR,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR(20),
  tags JSON,
  userId UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  userId UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Аутентификация и авторизация

### Поток аутентификации

```
┌─────────────────────────────────────────┐
│        User Authentication Flow         │
└─────────────────────────────────────────┘

1. Frontend (Clerk)
   │
   ├─► User signs in with Clerk UI
   │
   ├─► Clerk provides JWT token
   │
   ├─► Store token in localStorage
   │
   └─► Send token in Authorization header

2. Backend (NestJS + JWT)
   │
   ├─► Receive HTTP request with Bearer token
   │
   ├─► Extract token from Authorization header
   │
   ├─► Validate JWT (signature, expiry)
   │
   ├─► Extract user info from payload
   │
   ├─► Attach user to request object
   │
   └─► Allow/Deny access based on guards & permissions
```

### JWT Structure

```
Header.Payload.Signature

{
  "alg": "HS256",
  "typ": "JWT"
}.{
  "sub": "user-123",
  "email": "user@example.com",
  "roles": ["user"],
  "iat": 1674123456,
  "exp": 1674209856
}.signature_here
```

---

## Communication и API Contract

### REST API Endpoints

```
/api/auth/
  POST   /login          → Request: {email, password}
  POST   /register       → Request: {email, password, firstName}
  POST   /logout         → Request: -
  POST   /refresh        → Request: {refreshToken}

/api/projects/
  GET    /               → Response: Project[]
  GET    /:id            → Response: Project
  POST   /               → Request: CreateProjectDto
  PUT    /:id            → Request: UpdateProjectDto
  DELETE /:id            → Request: -

/api/contacts/
  POST   /               → Request: CreateContactDto
  GET    /               → Response: Contact[]
  GET    /:id            → Response: Contact
  PATCH  /:id/read       → Request: -
```

### Response Format

```json
Success (200):
{
  "data": {...},
  "status": 200,
  "message": "Success"
}

Error (400-500):
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

---

## Deployment архитектура

### Development

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Localhost  │◄────────┤   localhost  │────────►│   Localhost  │
│   3000       │ HTTP    │   3001       │ HTTP    │   5432       │
│ (Frontend)   │         │  (Backend)   │         │ (PostgreSQL) │
└──────────────┘         └──────────────┘         └──────────────┘
```

### Docker Compose

```
┌─────────────────────────────────────────────────────┐
│         Docker Compose Network                      │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐                │
│  │  frontend    │  │  backend     │                │
│  │  Container   │  │  Container   │                │
│  │  Port 3000   │  │  Port 3001   │                │
│  └──────────┬───┘  └────────┬──────┘                │
│             │               │                      │
│             │        ┌──────▼──────┐               │
│             │        │  postgres    │               │
│             │        │  Container   │               │
│             │        │  Port 5432   │               │
│             │        └──────────────┘               │
│             │                                      │
│             └──────► portfolio-blog-network        │
└─────────────────────────────────────────────────────┘
```

### Production (Vercel + Railway)

```
┌────────────────────────────────────────────┐
│             CDN / Vercel Edge              │
│        (Static Assets Distribution)        │
└────────────────┬─────────────────────────┘
                 │
        ┌────────▼──────────┐
        │                   │
    ┌───▼────────┐  ┌──────▼──────┐
    │  Frontend  │  │   Backend   │
    │  Vercel    │  │   Railway   │
    │  Port 443  │  │   Port 443  │
    └────────────┘  └──────┬──────┘
                           │
                    ┌──────▼────────┐
                    │   Database    │
                    │   PostgreSQL  │
                    │   AWS RDS     │
                    └───────────────┘
```

---

## Масштабируемость и Future Improvements

### Текущее состояние

- ✅ Монолитное приложение
- ✅ Single database
- ✅ Basic authentication

### Возможные улучшения

```
1. Микросервисы
   - Auth Service
   - Projects Service
   - Contacts Service
   - Notifications Service

2. Кеширование
   - Redis для session storage
   - Server-side caching
   - Client-side caching strategies

3. Масштабируемость БД
   - Database replication
   - Read replicas
   - Sharding

4. API улучшения
   - Rate limiting
   - API versioning
   - GraphQL поддержка

5. Мониторинг & Logging
   - Centralized logging (ELK Stack)
   - Error tracking (Sentry)
   - Performance monitoring (DataDog)

6. CI/CD
   - GitHub Actions workflows
   - Automated testing
   - Continuous deployment

7. Security
   - API key management
   - WAF (Web Application Firewall)
   - DDoS protection
```

---

## Technologies Stack Map

```
┌─────────────────────────────────────────────┐
│          Technology Selection               │
├─────────────────────────────────────────────┤
│                                             │
│  Frontend: Next.js > React > Vue > Angular │
│  ├─ Most popular for modern SPAs           │
│  └─ Built-in optimization & routing        │
│                                             │
│  Backend: NestJS > Express > FastAPI       │
│  ├─ Type-safe, modular architecture        │
│  └─ Great for scalable applications        │
│                                             │
│  Database: PostgreSQL > MongoDB            │
│  ├─ ACID compliance for critical data      │
│  └─ JSON support for flexible schemas      │
│                                             │
│  Auth: Clerk > Auth0 > Firebase            │
│  ├─ Modern, user-friendly                  │
│  └─ Secure by default                      │
│                                             │
│  Styling: Tailwind CSS > Bootstrap         │
│  ├─ Utility-first approach                 │
│  └─ Smaller bundle sizes                   │
│                                             │
│  Deployment: Vercel > Netlify              │
│  ├─ Optimized for Next.js                  │
│  └─ Simple CI/CD integration               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Версионирование

- **Major**: 1 (Breaking changes expected)
- **Minor**: 0 (Feature additions)
- **Patch**: 0 (Bug fixes)

**Текущая версия:** 1.0.0

---

**Архитектура документирована:** 16 января 2026  
**Последнее обновление:** 16 января 2026
