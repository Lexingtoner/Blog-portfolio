'use client';

import React, { useState } from 'react';
export const Contacts: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 3000);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Отправить сообщение</h3>

                {submitted && (
                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500 text-green-400 rounded-lg">
                        ✅ Сообщение отправлено успешно!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Имя
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="Ваше имя"
                        />
                        </div> 

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Сообщение
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                            placeholder="Ваше сообщение..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                        Отправить
                    </button>
                </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-6">Способы связи</h3>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl">📧</span>
                            <div>
                                <p className="text-gray-300 font-medium">Email</p>
                                <a href="mailto:contact@example.com" className="text-cyan-400 hover:text-cyan-300">
                                    contact@example.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-2xl">💬</span>
                            <div>
                                <p className="text-gray-300 font-medium">Telegram</p>
                                <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                                    @username
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-2xl">💻</span>
                            <div>
                                <p className="text-gray-300 font-medium">GitHub</p>
                                <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                                    github.com/username
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <span className="text-2xl">🔗</span>
                            <div>
                                <p className="text-gray-300 font-medium">LinkedIn</p>
                                <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                                    linkedin.com/in/username
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
