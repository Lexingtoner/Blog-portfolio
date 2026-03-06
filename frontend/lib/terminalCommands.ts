export const executeTerminalCommand = (command: string): string => {
        const raw = command.trim();
        const cmd = raw.toLowerCase();

        const commands: Record<string, string> = {
                help: `Available commands:
  help             - Show this help message
  about            - Information about the portfolio
  skills           - List of technical skills
  projects         - List of projects
  contact          - Contact information
  clear            - Clear the terminal (use 'clear' in the UI)
  whoami           - Show current user
  date             - Show current date and time
  echo <text>      - Echo the text
  repo             - Show GitHub repository
  api-status       - Check API status
  weather          - Get weather information`,

                about: `Portfolio & Blog Application
Version: 1.0.0
A full-stack web application showcasing projects, skills, and services.
Built with Next.js, React, NestJS, and TypeScript.`,

                skills: `Technical Skills:
Frontend:
  - React, Vue, Next.js, Clerify
  - TypeScript
  - Tailwind CSS
  - Vite

Backend:
  - NestJS
  - Node.js
  - Express
  - PostgreSQL & MongoDB
  - Python (Flask, Django)
  - C# (.NET Core)

DevOps:
  - Docker
  - GitHub Actions
  - Webpack

Authentication:
  - Clerk
  - JWT & OAuth 2.0,

  Mobile Development:
  - React Native
  - Expo
        - Kotlin`,

                projects: `Active Projects:
1. Portfolio Blog (In Progress)
2. E-Commerce Platform (Completed)
3. Real-time Chat Application (Active)
4. Music Streaming Service (In Progress)
5. Task Management Tool (Active)

Type 'help' for more commands`,

                contact: `Contact Information:
📧 Email: contact@example.com
💬 Telegram: @username
💻 GitHub: github.com/username
🔗 LinkedIn: linkedin.com/in/username
🎮 Discord: GameCommunity#1234`,

                clear: '__CLEAR__',

                whoami: `Current User: Anonymous
To access personal content, please sign in using Clerk authentication.`,

                date: new Date().toLocaleString('ru-RU'),

                'repo': `GitHub Repository:
https://github.com/username/portfolio-blog
Feel free to contribute!`,

                'api-status': `API Status: ✅ Online
Backend: NestJS (http://localhost:3001)
Status: Running
Response Time: 45ms`,

                'weather': `Weather Information:
City: Current Location
Temperature: 15°C
Condition: Partly Cloudy
Humidity: 65%
Wind: 10 km/h`,
        };

        // Handle echo command
        if (cmd.startsWith('echo ')) {
                return raw.substring(5);
        }

        // Dynamic date
        if (cmd === 'date') {
                return new Date().toLocaleString('ru-RU');
        }

        // Handle unknown commands
        if (!commands[cmd]) {
                return `Command not found: ${raw}\nType 'help' for available commands`;
        }

        return commands[cmd];
};
