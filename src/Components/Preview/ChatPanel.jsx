'use client';
import { ArrowRight, Sparkles } from 'lucide-react';
// import { cn } from '@/Web-Builder/lib/utils';
export function ChatPanel({
    inputValue = '',
    isLoading = false,
    onInputChange,
    onSubmit
}) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.();
        }
    };
    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
            <div className="pointer-events-auto w-full bg-white rounded-xl shadow-2xl border border-gray-100 flex items-center p-2 pl-5 gap-3 transition-shadow hover:shadow-xl">
                {/* Input Field */}
                <input
                    value={inputValue}
                    onChange={(e) => onInputChange?.(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Example : &quot;Explain quantum computing in simple terms&quot;"
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-700 placeholder:text-gray-400 font-medium"
                />
                {/* Send Button */}
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !inputValue.trim()}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${inputValue.trim()
                        ? "text-black hover:bg-gray-100"
                        : "text-gray-300 cursor-not-allowed"
                        }`}
                >
                    {isLoading ? (
                        <Sparkles className="w-4 h-4 animate-spin text-blue-500" />
                    ) : (
                        <>
                            <ArrowRight className="w-4 h-4" />
                            <span>Send</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}