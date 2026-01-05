'use client';
import { ArrowRight, Sparkles, User, MousePointer2, X, Plus, Clock } from 'lucide-react';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { ThemeContext } from "../../ThemeProvider";
import Cookies from "js-cookie";
import { gsap } from "gsap";
import { ChatHistory } from "./ChatHistory";

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

    // Chat conversation management (API-based)
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [showHistory, setShowHistory] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [isLoadingConversations, setIsLoadingConversations] = useState(false);

    // ==========================================
    // 1. LOAD CONVERSATIONS (Sidebar Load)
    // ==========================================
    const loadConversations = useCallback(async () => {
        if (!propSessionId) return;

        console.log('📋 Loading conversations for session:', propSessionId);
        setIsLoadingConversations(true);

        try {
            const token = Cookies.get("access_token");
            const url = `${BASE_URL}/web-generator/conversations/${propSessionId}`;
            console.log('📡 API Call:', url);

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('📥 Response status:', response.status, response.ok ? '✅' : '❌');

            if (response.ok) {
                const data = await response.json();
                const conversationsRaw = data.conversations || [];

                console.log('📦 Received conversations:', conversationsRaw.length, 'items');
                console.log('📦 Raw conversation data:', conversationsRaw[0]);

                // Transform backend snake_case to frontend camelCase
                const conversationsList = conversationsRaw.map(conv => ({
                    id: conv.conversation_id,           // ✅ Map conversation_id -> id
                    title: conv.title || 'New Chat',
                    lastMessage: conv.last_message || 'No messages yet',
                    messageCount: conv.message_count || 0,
                    updatedAt: conv.updated_at || Date.now()
                }));

                console.log('✅ Transformed conversations:', conversationsList[0]);

                setConversations(conversationsList);

                // If no current conversation and we have conversations, load the most recent one
                if (!currentConversationId && conversationsList.length > 0) {
                    const latestConversation = conversationsList[0];
                    console.log('⏰ Auto-loading latest conversation:', latestConversation.id);

                    // Validate conversation has valid ID before loading
                    if (latestConversation && latestConversation.id && latestConversation.id !== 'undefined') {
                        await loadConversationMessages(latestConversation.id);
                    }
                }
            } else {
                const errorText = await response.text();
                console.error('❌ API Error:', response.status, errorText);
            }
        } catch (error) {
            console.error('❌ Failed to load conversations:', error);
        } finally {
            setIsLoadingConversations(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propSessionId, BASE_URL]);

    // ==========================================
    // 2. CREATE NEW CONVERSATION (+ Button)
    // ==========================================
    const createNewConversation = async () => {
        if (!propSessionId) return;

        try {
            const token = Cookies.get("access_token");
            const response = await fetch(`${BASE_URL}/web-generator/conversation/new`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session_id: propSessionId })
            });

            if (response.ok) {
                const data = await response.json();

                // Validate conversation_id before setting
                if (data.conversation_id && data.conversation_id !== 'undefined') {
                    setCurrentConversationId(data.conversation_id);
                    setChatHistory([]);
                    onInputChange?.('');
                    setLastActivityTime(Date.now());

                    // Reload conversations list
                    await loadConversations();
                } else {
                    console.error('Invalid conversation_id received from API:', data);
                }
            }
        } catch (error) {
            console.error('Failed to create new conversation:', error);
        }
    };

    // ==========================================
    // 3. LOAD CONVERSATION MESSAGES (History Click)
    // ==========================================
    const loadConversationMessages = async (conversationId) => {
        console.log('📨 Loading conversation messages for ID:', conversationId);

        // Validate conversation ID
        if (!conversationId || conversationId === 'undefined') {
            console.error('❌ Invalid conversation ID:', conversationId);
            return;
        }

        try {
            const token = Cookies.get("access_token");
            const url = `${BASE_URL}/web-generator/conversation/${conversationId}`;
            console.log('📡 API Call:', url);

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('📥 Response status:', response.status, response.ok ? '✅' : '❌');

            if (response.ok) {
                const data = await response.json();
                console.log('📦 Received data:', data);

                const messages = (data.messages || []).map(msg => ({
                    type: msg.role === 'user' ? 'user' : 'ai',
                    message: msg.content,
                    metadata: msg.metadata,
                    timestamp: msg.created_at
                }));

                console.log('💬 Formatted messages:', messages.length, 'messages');

                setCurrentConversationId(conversationId);
                setChatHistory(messages);
                setLastActivityTime(Date.now());
            } else {
                const errorText = await response.text();
                console.error('❌ API Error:', response.status, errorText);
            }
        } catch (error) {
            console.error('❌ Failed to load conversation messages:', error);
        }
    };

    // ==========================================
    // 4. SWITCH TO EXISTING CONVERSATION
    // ==========================================
    const switchToConversation = async (conversationId) => {
        console.log('🔄 Switching to conversation:', conversationId);

        // Validate before switching
        if (!conversationId || conversationId === 'undefined') {
            console.error('Cannot switch to invalid conversation:', conversationId);
            return;
        }

        await loadConversationMessages(conversationId);
    };

    // ==========================================
    // 5. DELETE CONVERSATION
    // ==========================================
    const deleteConversation = async (conversationId) => {
        // Validate conversation ID before deletion
        if (!conversationId || conversationId === 'undefined') {
            console.error('Cannot delete invalid conversation:', conversationId);
            return;
        }

        try {
            const token = Cookies.get("access_token");
            const response = await fetch(`${BASE_URL}/web-generator/conversation/${conversationId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                // If deleted current conversation, create a new one
                if (conversationId === currentConversationId) {
                    await createNewConversation();
                }

                // Reload conversations list
                await loadConversations();
            }
        } catch (error) {
            console.error('Failed to delete conversation:', error);
        }
    };

    // Generate a title for the chat based on first user message
    const generateChatTitle = (messages) => {
        const firstUserMessage = messages.find(m => m.type === 'user');
        if (firstUserMessage) {
            const text = firstUserMessage.message;
            return text.length > 40 ? text.substring(0, 40) + '...' : text;
        }
        return 'New Chat';
    };

    // Load conversations when chat panel opens
    useEffect(() => {
        if (isOpen && propSessionId) {
            loadConversations();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, propSessionId]);

    // Initialize conversation on first open if needed
    useEffect(() => {
        if (isOpen && !currentConversationId && conversations.length === 0 && !isLoadingConversations) {
            createNewConversation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentConversationId, conversations.length, isLoadingConversations]);

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

    // Removed 5-second auto-close rule as per user request

    // ==========================================
    // 6. SEND CHAT MESSAGE
    // ==========================================
    const handleSendMessage = async () => {
        const message = inputValue.trim();
        if (!message || isLoading) return;

        const sessionId = propSessionId || Cookies.get("session_id");
        const token = Cookies.get("access_token");

        if (!sessionId) {
            gsap.to(containerRef.current, { x: 8, duration: 0.05, repeat: 5, yoyo: true });
            return;
        }

        // If no conversation exists, create one first
        if (!currentConversationId) {
            await createNewConversation();
            return; // Will retry after conversation is created
        }

        setChatHistory(prev => [...prev, { type: 'user', message }]);
        onInputChange?.("");
        setIsLoading(true);

        try {
            // Build the request body with conversation_id
            const requestBody = {
                session_id: sessionId,
                conversation_id: currentConversationId,
                message
            };

            // If an element is selected, add it to the context
            if (selectedElementName) {
                requestBody.selected_element = selectedElementName;
                requestBody.message = `[Editing element: ${selectedElementName}] ${message}`;
            }

            const response = await fetch(`${BASE_URL}/web-generator/chat`, {
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

                // Add AI response with metadata
                setChatHistory(prev => [...prev, {
                    type: 'ai',
                    message: aiMessage,
                    metadata: {
                        actions_taken: data.actions_taken || [],
                        suggestions: data.suggestions || [],
                        intent: data.intent
                    }
                }]);

                setLastActivityTime(Date.now());

                // Reload conversations to update title and last message
                await loadConversations();

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
            console.error('Failed to send message:', err);
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
        <>
            <div ref={panelRef} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
                {/* Header with New Chat and History buttons */}
                <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {/* New Chat Button */}
                        <button
                            onClick={createNewConversation}
                            className="group flex items-center gap-2 px-4 py-2 rounded-xl 
                                bg-gradient-to-r from-purple-500 to-blue-500 
                                text-white font-medium text-sm shadow-lg 
                                hover:shadow-purple-500/30 transition-all
                                hover:scale-105 active:scale-95"
                            title="Start new chat"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Chat</span>
                        </button>

                        {/* Current Chat Title */}
                        {chatHistory.length > 0 && (
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-gray-400 text-sm">
                                    {generateChatTitle(chatHistory)}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* History Button */}
                        <button
                            onClick={() => setShowHistory(true)}
                            className="group flex items-center gap-2 px-4 py-2 rounded-xl 
                                bg-white/5 border border-white/10 
                                hover:bg-white/10 hover:border-purple-500/50 
                                text-gray-400 hover:text-white 
                                transition-all"
                            title="Chat history"
                        >
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">History</span>
                            {conversations.length > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                                    {conversations.length}
                                </span>
                            )}
                        </button>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-red-500/20 transition-all"
                            title="Close chat"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

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

            {/* Chat History Sidebar */}
            <ChatHistory
                isOpen={showHistory}
                onClose={() => setShowHistory(false)}
                chatSessions={conversations}
                onSelectChat={switchToConversation}
                onDeleteChat={deleteConversation}
            />
        </>
    );
}