# Portfolio Blog Frontend

Современный фронтенд приложение для портфолио-блога, построенное на Next.js и React.

## 🚀 Особенности

- **Next.js 14** - Новейший React фреймворк с Server Components
- **React 18** - Современная React библиотека
- **TypeScript** - Строгая типизация
- **Tailwind CSS** - Утилит-фёрст CSS фреймворк
- **Clerk Authentication** - Безопасная аутентификация
- **Responsive Design** - Адаптивный дизайн для всех устройств
- **Dark UI** - Современный темный интерфейс

## 📦 Компоненты

### Terminal.tsx

Интерактивный терминал с поддержкой команд:

- `help` - Справка
- `about` - О портфолио
- `skills` - Навыки
- `projects` - Проекты
- `contact` - Контакты
- И другие...

### MusicPlayer.tsx

Музыкальный плеер с поддержкой:

- Play/Pause управления
- Регулировки громкости
- Отображения времени воспроизведения
- Progress bar с перемоткой

### Projects.tsx

Раздел с проектами:

- Описание проекта
- Статус (Active, Completed, In Progress)
- Теги технологий
- Ссылки на GitHub и Demo

### TechStack.tsx

Технологический стек:

- Frontend технологии
- Backend технологии
- DevOps и инструменты
- Аутентификация и безопасность

### Contacts.tsx

Контактная форма и информация:

- Форма для отправки сообщений
- Email, Telegram, GitHub, LinkedIn ссылки
- Валидация формы
- Успешное уведомление об отправке

### Discord.tsx

Информация о Discord сервере:

- Описание сервера
- Правила сервера
- Список каналов
- Статистика членов

### Navigation.tsx

Навигационное меню:

- Меню ссылок
- Интеграция Clerk для авторизации
- Responsive на мобильных устройствах

## 📖 Документация по компонентам

Каждый компонент расположен в `components/` и экспортирует React компонент с типами TypeScript.

```typescript
export const ComponentName: React.FC = () => {
  // Component implementation
};
```

## 🎨 Стилизация

Приложение использует Tailwind CSS для стилизации. Все классы используют утилиты Tailwind:

```tsx
<div className="bg-gray-800 border border-cyan-500 rounded-lg p-6">
  Content
</div>
```

## 🔐 Аутентификация с Clerk

Clerk интегрирован через компонент `ClerkProvider` в layout.tsx:

```tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="ru">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

Использование в компонентах:

```tsx
import { useUser } from '@clerk/nextjs';

export const Navigation = () => {
  const { user, isSignedIn } = useUser();
  
  return (
    // Conditional rendering based on auth status
  );
};
```

## 🛠️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск development сервера
npm run dev

# Build для production
npm run build

# Запуск production сервера
npm start

# Проверка типов
npm run type-check
```

## 📁 Структура папок

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Terminal.tsx
│   ├── MusicPlayer.tsx
│   ├── Projects.tsx
│   ├── TechStack.tsx
│   ├── Contacts.tsx
│   ├── Discord.tsx
│   └── Navigation.tsx
├── lib/                   # Utility functions
│   └── terminalCommands.ts
├── next.config.js         # Next.js configuration
├── webpack.config.js      # Webpack configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## 🎯 Переменные окружения

Создайте файл `.env.local` с переменными:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Развертывание

### Vercel (Рекомендуется для Next.js)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t portfolio-blog-frontend .
docker run -p 3000:3000 portfolio-blog-frontend
```

## 📱 Адаптивный дизайн

Компоненты используют Tailwind CSS breakpoints для адаптивности:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎵 Музыка

Для использования музыкального плеера, добавьте файл `majula.mp3` в `public/music/` папку:

```
public/
└── music/
    └── majula.mp3
```

## 📝 Лицензия

MIT
