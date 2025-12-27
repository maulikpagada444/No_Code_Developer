'use client';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from "../../ThemeProvider";

export function ChatPanel({
    inputValue = '',
    isLoading = false,
    onInputChange,
    onSubmit
}) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit?.();
        }
    };

    return (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none">
            <div
                className={`
                    pointer-events-auto w-full rounded-xl border flex items-center p-2 pl-5 gap-3
                    transition-all backdrop-blur-xl
                    ${isDark
                        ? "bg-white/10 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
                        : "bg-white border-gray-200 shadow-2xl"
                    }
                `}
            >
                {/* Input */}
                <input
                    value={inputValue}
                    onChange={(e) => onInputChange?.(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Example: "Explain quantum computing in simple terms"'
                    disabled={isLoading}
                    className={`
                        flex-1 bg-transparent border-none outline-none text-[15px] font-medium
                        ${isDark
                            ? "text-white placeholder:text-gray-400"
                            : "text-gray-700 placeholder:text-gray-400"
                        }
                    `}
                />

                {/* Send Button */}
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !inputValue.trim()}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                        ${inputValue.trim()
                            ? isDark
                                ? "text-white hover:bg-white/10"
                                : "text-black hover:bg-gray-100"
                            : "text-gray-400 cursor-not-allowed"
                        }
                    `}
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
