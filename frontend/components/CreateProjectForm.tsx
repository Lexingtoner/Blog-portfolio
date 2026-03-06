'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface CreateProjectFormData {
    title: string;
    description: string;
    status: 'active' | 'completed' | 'in-progress';
    tags: string;
}

export const CreateProjectForm: React.FC = () => {
    const [formData, setFormData] = useState<CreateProjectFormData>({
        title: '',
        description: '',
        status: 'in-progress',
        tags: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            await axios.post(`${apiUrl}/api/projects`, {
                ...formData,
                tags: formData.tags.split(',').map((tag) => tag.trim()),
            });

            setSuccess(true);
            setFormData({ title: '', description: '', status: 'in-progress', tags: '' });

            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Error creating project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Добавить новый проект</h2>

            {success && (
                <div className="mb-4 p-4 bg-green-500/10 border border-green-500 text-green-400 rounded-lg">
                    ✅ Проект успешно добавлен!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Название проекта
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Название проекта"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Описание
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        placeholder="Описание проекта"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                            Статус
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        >
                            <option value="in-progress">В разработке</option>
                            <option value="active">Активен</option>
                            <option value="completed">Завершен</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Теги (через запятую)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="React, Node.js, TypeScript"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                    {loading ? 'Добавление...' : 'Добавить проект'}
                </button>
            </form>
        </div>
    );
};
