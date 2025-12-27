"use client";
import { useState } from 'react';
import { BottomToolbar } from './BottomToolbar';
import { ChatPanel } from './ChatPanel';
import { Paperclip, User } from 'lucide-react';
export default function PreviewPanel() {
    const [viewMode, setViewMode] = useState('desktop');
    const [inputValue, setInputValue] = useState('');
    return (
        <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden font-sans">
            {/* 1. Header (Matches Image) */}
            <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-50 relative">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Paperclip className="h-5 w-5 -rotate-45 text-black" />
                    <span className="font-bold text-lg text-black tracking-tight">Logo</span>
                </div>
                {/* Center: Edit/Preview Toggle */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                        {/* Edit Icon (Simple Pencil) */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                        Edit
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-gray-900">
                        {/* Preview Icon (Eye/Layout) */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                        Preview
                    </button>
                </div>
                {/* Right: User Profile */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md bg-white">
                        <span className="text-sm font-medium text-gray-700">Demo User</span>
                        <User className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </header>
            {/* 2. Main Preview Area */}
            <main className="flex-1 relative w-full h-full bg-[#F8F9FA] flex items-center justify-center p-8 overflow-hidden">
                {/* Background Grid Pattern (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />
                {/* Website Container (Replicates the "Galaxy" site look or uses iframe) */}
                <div
                    className="bg-[#0A0A0A] shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out border border-gray-900/10"
                    style={{
                        width: viewMode === 'mobile' ? '375px' : viewMode === 'tablet' ? '768px' : '100%',
                        height: viewMode === 'desktop' ? '100%' : '85%', // Adjust height for devices
                        maxHeight: '100%',
                        borderRadius: viewMode === 'desktop' ? '0' : '16px',
                    }}
                >
                    {/* If content provided, use Iframe, otherwise Placeholder Image/Mockup */}
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                        {/* Placeholder UI for 'Galaxy' SaaS if needed, or just Iframe */}
                        <iframe
                            className="w-full h-full border-0 bg-[#050510]"
                            // Mock content to show something visual
                            srcDoc={`
                        <html>
                        <body style="margin:0;background:#050510;font-family:sans-serif;color:white;display:flex;align-items:center;justify-content:center;height:100vh;">
                            <div style="text-align:center;">
                                <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:40px;opacity:0.8;">
                                   <span style="font-weight:bold;font-size:20px;">Galaxy</span>
                                </div>
                                <h1 style="font-size:56px;font-weight:700;background:linear-gradient(to right, #A78BFA, #3B82F6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:0 0 20px 0;">Revolutionize your digital<br/>saas products</h1>
                                <p style="color:#9ca3af;font-size:18px;max-width:600px;margin:0 auto;">Create stunning, professional-quality websites in record time with our powerful UI kit.</p>
                            </div>
                        </body>
                        </html>
                    `}
                            title="Preview"
                        />
                    </div>
                </div>
            </main>
            {/* 3. Floating Overlays (Chat & Toolbar) */}
            {/* Chat Input */}
            <ChatPanel
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={() => setInputValue('')}
            />
            {/* Bottom Toolbar */}
            <BottomToolbar
                viewMode={viewMode}
                onViewChange={setViewMode}
                onPublishClick={() => alert('Publishing...')}
            />
        </div>
    );
}
