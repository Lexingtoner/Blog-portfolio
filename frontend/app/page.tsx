'use client';

import { Terminal } from '@/components/Terminal';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Projects } from '@/components/Projects';
import { TechnoStack } from '@/components/TechStack';
import { Contacts } from '@/components/Contacts';
import { Discord } from '@/components/Discord';
import { Navigation } from '@/components/Navigation';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <Navigation />

            <main className="container mx-auto px-4 py-20">
                {/* Hero Section */}
                <section className="mb-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Portfolio & Blog
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Интерактивное портфолио с полнофункциональным блогом, проектами и контактной информацией
                    </p>
                </section>

                {/* Music Player */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">🎵 Музыкальный плеер</h2>
                    <MusicPlayer />
                </section>

                {/* Interactive Terminal */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">💻 Интерактивный терминал</h2>
                    <Terminal />
                </section>

                {/* Projects Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">🚀 Мои проекты</h2>
                    <Projects />
                </section>

                {/* Tech Stack Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">⚙️ Технологический стек</h2>
                    <TechnoStack />
                </section>

                {/* Discord Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">🎮 Discord сервер</h2>
                    <Discord />
                </section>

                {/* Contacts Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">📧 Контакты</h2>
                    <Contacts />
                </section>
            </main>

            <footer className="border-t border-gray-700 py-8 mt-20">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2026 Portfolio Blog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
