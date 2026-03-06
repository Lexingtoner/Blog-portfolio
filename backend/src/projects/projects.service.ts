import { Injectable, Module } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
    private projects = [
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

    findAll() {
        return this.projects;
    }

    findOne(id: string) {
        return this.projects.find((p) => p.id === id);
    }

    create(createProjectDto: any) {
        const newProject = {
            id: Date.now().toString(),
            ...createProjectDto,
        };
        this.projects.push(newProject);
        return newProject;
    }
}
