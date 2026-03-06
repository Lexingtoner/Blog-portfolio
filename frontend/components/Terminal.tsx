'use client';

import React, { useState, useEffect, useRef } from 'react';
import { executeTerminalCommand } from '@/lib/terminalCommands';

export const Terminal: React.FC = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([]);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Фокус на инпут при клике в любое место терминала
    const focusInput = () => inputRef.current?.focus();

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const result = executeTerminalCommand(trimmedInput);

        if (result === '__CLEAR__') {
            setHistory([]);
        } else {
            // Добавляем команду и её результат в историю
            setHistory(prev => [...prev, { command: trimmedInput, output: result }]);
        }

        setInput('');
        setHistoryIndex(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
            if (history[newIndex]) {
                setHistoryIndex(newIndex);
                setInput(history[newIndex].command);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === null) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= history.length) {
                setHistoryIndex(null);
                setInput('');
            } else {
                setHistoryIndex(newIndex);
                setInput(history[newIndex].command);
            }
        }
    };

    return (
        <div 
            onClick={focusInput}
            className="w-full max-w-4xl mx-auto bg-stone-950/80 backdrop-blur-md rounded-sm border border-amber-900/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] font-mono overflow-hidden"
        >
            {/* Terminal Header */}
            <div className="bg-stone-900/50 px-4 py-2 border-b border-amber-900/20 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-900/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-800/30" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-700/60 font-serif">
                    Far Fire OS v2.0.26
                </p>
            </div>

            {/* Output Area */}
            <div 
                ref={outputRef}
                className="p-6 h-[450px] overflow-y-auto custom-scrollbar selection:bg-amber-900/50 selection:text-amber-200"
            >
                <div className="mb-6 opacity-60">
                    <p className="text-amber-600 text-xs italic">"Seeker of fire, deliverer of crowns."</p>
                    <p className="text-stone-500 text-[10px]">Connected to Majula_Mainframe:8080</p>
                </div>

                {history.map((item, index) => (
                    <div key={index} className="mb-4 animate-in fade-in slide-in-from-left-2 duration-500">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-amber-500/50 text-xs">»</span>
                            <span className="text-stone-300 text-sm tracking-wide">{item.command}</span>
                        </div>
                        <div className="text-stone-400 text-sm ml-5 border-l border-amber-900/20 pl-4 py-1 leading-relaxed">
                            {item.output}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleCommand} className="p-4 bg-black/40 border-t border-amber-900/10">
                <div className="flex items-center gap-3">
                    <span className="text-amber-600 animate-pulse font-bold">›</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter command (e.g. 'help', 'status', 'bonfire')..."
                        className="flex-1 bg-transparent text-amber-100 outline-none placeholder:text-stone-800 text-sm tracking-wider"
                        autoFocus
                    />
                </div>
            </form>

            <style about='global'>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #451a03; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #78350f; }
            `}</style>
        </div>
    );
};
