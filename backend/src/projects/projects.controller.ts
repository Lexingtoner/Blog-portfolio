import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// --First Draft--

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {
    @Get()
    @ApiOperation({ summary: 'Get all projects' })
    @ApiResponse({ status: 200, description: 'List of all projects' })
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

    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'Project created successfully' })
    async createProject(@Body() createProjectDto: any) {
        return {
            id: 'new-project-id',
            ...createProjectDto,
            createdAt: new Date(),
        };
    }
}
