"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
let ProjectsService = class ProjectsService {
    constructor() {
        this.projects = [
            {
                id: '1',
                title: 'Portfolio Blog',
                description: 'Full-stack веб-приложение с фронтенд на Next.js и бэкенд на NestJS',
                status: 'in-progress',
                tags: ['Next.js', 'NestJS', 'TypeScript', 'React'],
            },
            {
                id: '2',
                title: 'E-Commerce Platform',
                description: 'Платформа для электронной коммерции с интеграцией платежей',
                status: 'completed',
                tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            },
            {
                id: '3',
                title: 'Real-time Chat Application',
                description: 'Приложение для чата с поддержкой WebSocket и видеозвонков',
                status: 'active',
                tags: ['Socket.io', 'WebRTC', 'Node.js', 'React'],
            },
        ];
    }
    findAll() {
        return this.projects;
    }
    findOne(id) {
        return this.projects.find((p) => p.id === id);
    }
    create(createProjectDto) {
        const newProject = {
            id: Date.now().toString(),
            ...createProjectDto,
        };
        this.projects.push(newProject);
        return newProject;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)()
], ProjectsService);
//# sourceMappingURL=projects.service.js.map