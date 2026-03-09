'use client';

import React from 'react';

export function Discord() {
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Server Info */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-500 rounded-lg p-8">
                <div className="flex items-start gap-6 mb-6">
                    <div className="text-6xl">🎮</div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-2">Gaming Community</h3>
                        <p className="text-indigo-200 text-lg">Присоединись к нашему серверу для общения, игр и обсуждения проектов</p>
                    </div>
                </div>

                <div className="bg-indigo-800/30 border border-indigo-400 rounded-lg p-6 mb-6">
                    <h4 className="text-xl font-bold text-indigo-200 mb-4">📋 Основные правила сервера:</h4>
                    <ul className="space-y-3 text-indigo-100">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-300 mt-1">✓</span>
                            <span>Уважай всех членов сообщества - никакого оскорбления или хейта</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-300 mt-1">✓</span>
                            <span>Придерживайся темы обсуждений в соответствующих каналах</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-300 mt-1">✓</span>
                            <span>Не спамь и не постй контент NSFW без предупреждения</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-300 mt-1">✓</span>
                            <span>Использование ботов и автоматизации запрещено</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-300 mt-1">✓</span>
                            <span>Реклама разрешена только в специальных каналах</span>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-700/20 border border-indigo-400 rounded-lg p-4">
                        <p className="text-indigo-300 text-sm mb-1">Членов на сервере</p>
                        <p className="text-2xl font-bold text-indigo-200">1,234</p>
                    </div>
                    <div className="bg-indigo-700/20 border border-indigo-400 rounded-lg p-4">
                        <p className="text-indigo-300 text-sm mb-1">Активных сейчас</p>
                        <p className="text-2xl font-bold text-indigo-200">342</p>
                    </div>
                </div>
            </div>

            {/* Channels & Join */}
            <div className="space-y-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-cyan-400 mb-4">📡 Основные каналы</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="text-indigo-400">#</span>
                            <span>general</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-indigo-400">#</span>
                            <span>projects</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-indigo-400">#</span>
                            <span>dev-talk</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-indigo-400">#</span>
                            <span>gaming</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-indigo-400">#</span>
                            <span>music</span>
                        </li>
                    </ul>
                </div>

                <a
                    href="https://discord.gg/your-invite-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                    Присоединиться
                </a>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <p className="text-xs text-gray-400 text-center">
                        Приглашение действует бесконечно
                    </p>
                </div>
            </div>
        </div> 
    );
}
