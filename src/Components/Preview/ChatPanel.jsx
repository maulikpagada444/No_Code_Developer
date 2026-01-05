'use client';
import { ArrowRight, Sparkles, User, MousePointer2, X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from "../../ThemeProvider";
import Cookies from "js-cookie";
import { gsap } from "gsap";

export function ChatPanel({
    inputValue = '',
    isLoading: externalLoading = false,
    onInputChange,
    onSubmit,
    onCodeUpdate,
    onClose,
    sessionId: propSessionId,
    isOpen = false,
    selectedElementName = '',
}) {
    const { theme } = useContext(ThemeContext);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());

    const panelRef = useRef(null);
    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && containerRef.current) {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose?.();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (inputValue.length > 0) {
            setLastActivityTime(Date.now());
        }
    }, [inputValue]);

    useEffect(() => {
        if (!isOpen || isLoading || inputValue.length > 0) return;

        const checkInactivity = () => {
            if (Date.now() - lastActivityTime >= 5000) {
                onClose?.();
            }
        };

        const timer = setTimeout(checkInactivity, 5000);
        return () => clearTimeout(timer);
    }, [isOpen, inputValue, isLoading, lastActivityTime, onClose]);

    const handleSendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        const sessionId = propSessionId || Cookies.get("session_id");
        const token = Cookies.get("access_token");

        if (!sessionId) {
            gsap.to(containerRef.current, { x: 8, duration: 0.05, repeat: 5, yoyo: true });
            return;
        }

        setChatHistory(prev => [...prev, { type: 'user', message }]);
        onInputChange?.("");
        setIsLoading(true);

        try {
            // Build the request body with optional element context
            const requestBody = {
                session_id: sessionId,
                message
            };

            // If an element is selected, add it to the context
            if (selectedElementName) {
                requestBody.selected_element = selectedElementName;
                requestBody.message = `[Editing element: ${selectedElementName}] ${message}`;
            }

            const response = await fetch(`${BASE_URL}/project/chat-message`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (response.ok && data) {
                const aiMessage = data.response || data.message || "Done!";
                setChatHistory(prev => [...prev, { type: 'ai', message: aiMessage }]);
                setLastActivityTime(Date.now());

                // Always trigger code update if we got a response
                // This will cause the preview to regenerate
                if (data.blueprint_updated || data.response) {
                    onCodeUpdate?.(data);
                }
                onSubmit?.(data);
            } else {
                setChatHistory(prev => [...prev, { type: 'ai', message: data?.message || "Something went wrong" }]);
            }
        } catch (err) {
            setChatHistory(prev => [...prev, { type: 'ai', message: "Failed to send message" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const loading = isLoading || externalLoading;

    if (!isOpen) return null;

    return (
        <div ref={panelRef} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
            {/* Chat History */}
            {chatHistory.length > 0 && (
                <div className="mb-3 max-h-72 overflow-y-auto rounded-2xl glass-card border border-white/10 shadow-2xl">
                    <div className="p-4 space-y-3">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`flex gap-3 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {chat.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${chat.type === 'user'
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md'
                                    : 'bg-white/10 text-white rounded-bl-md'
                                    }`}>
                                    {chat.message}
                                </div>
                                {chat.type === 'user' && (
                                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white animate-spin" />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-white/10 rounded-bl-md">
                                    <span className="text-gray-400 animate-pulse">AI is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}

            {/* Selected Element Badge */}
            {selectedElementName && (
                <div className="mb-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center gap-2 text-sm">
                    <MousePointer2 className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-400">Editing:</span>
                    <code className="px-2 py-0.5 rounded-lg bg-white/10 text-purple-400 font-mono text-xs">
                        {selectedElementName}
                    </code>
                </div>
            )}

            {/* Input Container */}
            <div
                ref={containerRef}
                className="glass-card w-full rounded-2xl border border-white/10 flex items-center p-2 pl-5 gap-3 shadow-2xl"
            >
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => onInputChange?.(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Ask AI to make changes... (e.g., "Make hero section dark")'
                    disabled={loading}
                    className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-gray-500"
                />

                {inputValue.trim() && (
                    <button
                        onClick={() => onInputChange?.("")}
                        className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={16} />
                    </button>
                )}

                <button
                    onClick={handleSendMessage}
                    disabled={loading || !inputValue.trim()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${inputValue.trim()
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
                        : 'bg-white/5 text-gray-500'
                        }`}
                >
                    {loading ? (
                        <>
                            <Sparkles className="w-4 h-4 animate-spin" />
                            <span className="hidden sm:inline">Sending</span>
                        </>
                    ) : (
                        <>
                            <span className="hidden sm:inline">Send</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}