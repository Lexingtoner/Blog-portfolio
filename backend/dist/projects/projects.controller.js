"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
// --First Draft--
let ProjectsController = class ProjectsController {
    async getProjects() {
        return [
            {
                id: '1',
                title: 'Portfolio Blog',
                description: 'Full-stack веб-приложение с фронтенд на Next.js и бэкенд на NestJS',
                links: [
                    { label: 'GitHub', url: '#' },
                    { label: 'Demo', url: '#' },
                ],
                status: 'in-progress',
                tags: ['Next.js', 'NestJS', 'TypeScript', 'React'],
            },
            {
                id: '2',
                title: 'E-Commerce Platform',
                description: 'Платформа для электронной коммерции с интеграцией платежей',
                links: [
                    { label: 'GitHub', url: '#' },
                    { label: 'Demo', url: '#' },
                ],
                status: 'completed',
                tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            },
            {
                id: '3',
                title: 'Real-time Chat Application',
                description: 'Приложение для чата с поддержкой WebSocket и видеозвонков',
                links: [
                    { label: 'GitHub', url: '#' },
                    { label: 'Demo', url: '#' },
                ],
                status: 'active',
                tags: ['Socket.io', 'WebRTC', 'Node.js', 'React'],
            },
        ];
    }
    async createProject(createProjectDto) {
        return {
            id: 'new-project-id',
            ...createProjectDto,
            createdAt: new Date(),
        };
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all projects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getProjects", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new project' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Project created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('api/projects')
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map