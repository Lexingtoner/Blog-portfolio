'use client';

import React from 'react';

interface Technology {
    category: string;
    items: string[];
}

const TECHNOLOGIES: Technology[] = [
    {
        category: 'Frontend',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
    },
    {
        category: 'Backend',
        items: ['NestJS', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    {
        category: 'DevOps & Tools',
        items: ['Docker', 'Git', 'GitHub Actions', 'Webpack', 'ESLint'],
    },
    {
        category: 'Authentication & Security',
        items: ['Clerk', 'JWT', 'OAuth 2.0', 'CORS', 'SSL/TLS'],
    },
    {
        category: 'Mobile Development',
        items: ['Kotlin', 'MVVM', 'Dagger', 'Jetpack Compose', 'Coroutines', 'RxJava', 'Room'],
    },
];

export const TechnoStack: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECHNOLOGIES.map((tech) => (
                <div
                    key={tech.category}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
                >
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{tech.category}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tech.items.map((item) => (
                            <span
                                key={item}
                                className="px-4 py-2 bg-cyan-500/10 border border-cyan-500 text-cyan-300 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors cursor-default">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
