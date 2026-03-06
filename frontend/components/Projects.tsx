'use client';

import React from 'react';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    links: { label: string; url: string }[];
    status: 'active' | 'completed' | 'in-progress';
    tags: string[];
}

const PROJECTS: Project[] = [
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

const statusColors = {
    active: 'bg-green-500/10 border-green-500 text-green-400',
    completed: 'bg-blue-500/10 border-blue-500 text-blue-400',
    'in-progress': 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
};

export const Projects: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
                <div
                    key={project.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-cyan-400">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[project.status]}`}>
                            {project.status === 'in-progress' && '🔄 В разработке'}
                            {project.status === 'active' && '✅ Активен'}
                            {project.status === 'completed' && '✔️ Завершен'}
                        </span>
                    </div>

                    <p className="text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 bg-gray-700 text-cyan-300 text-xs rounded border border-cyan-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        {project.links.map((link) => (
                            <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center px-3 py-2 bg-cyan-500/10 border border-cyan-500 text-cyan-400 rounded hover:bg-cyan-500/20 transition-colors text-sm font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
