'use client';
import {
    Paperclip,
    MousePointer2,
    MessageSquare,
    Smartphone,
    Tablet,
    Monitor,
    Rocket,
    Undo2,
    Redo2,
    Type
} from 'lucide-react';
import { useContext } from "react";
import { ThemeContext } from "../../ThemeProvider";

export function BottomToolbar({
    viewMode = 'desktop',
    onViewChange,
    onPublishClick,
}) {
    const { theme } = useContext(ThemeContext);

    // 🔁 INVERTED THEME
    const isDarkUI = theme !== "dark"; // light theme → dark toolbar

    return (
        <div
            className={`
                fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                flex items-center gap-2 rounded-xl border p-2 backdrop-blur-xl shadow-2xl
                ${isDarkUI
                    ? "bg-[#0f0f0f] border-white/10 text-white"
                    : "bg-white border-gray-200 text-black"
                }
            `}
        >
            {/* History */}
            <div className="flex items-center gap-1 px-1">
                <button className={`h-8 w-8 transition ${isDarkUI ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>
                    <Undo2 className="h-4 w-4" />
                </button>
                <button className={`h-8 w-8 transition ${isDarkUI ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>
                    <Redo2 className="h-4 w-4" />
                </button>
            </div>

            <Divider isDarkUI={isDarkUI} />

            {/* Tools */}
            <div className="flex items-center gap-1 px-1">
                <ToolButton icon={Paperclip} label="Attach" isDarkUI={isDarkUI} />
                <ToolButton icon={MousePointer2} label="Interact" isDarkUI={isDarkUI} />

                <IconButton icon={Type} isDarkUI={isDarkUI} />
                <IconButton icon={MessageSquare} isDarkUI={isDarkUI} />
            </div>

            <Divider isDarkUI={isDarkUI} />

            {/* Devices */}
            <div className="flex items-center gap-1 px-1">
                {[
                    { id: 'mobile', Icon: Smartphone },
                    { id: 'tablet', Icon: Tablet },
                    { id: 'desktop', Icon: Monitor },
                ].map(({ id, Icon }) => (
                    <button
                        key={id}
                        onClick={() => onViewChange?.(id)}
                        className={`
                            h-8 w-8 flex items-center justify-center rounded-lg transition-all
                            ${viewMode === id
                                ? isDarkUI
                                    ? "border-2 border-white text-white"
                                    : "border-2 border-black text-black"
                                : isDarkUI
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-400 hover:text-black"
                            }
                        `}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                ))}
            </div>

            <Divider isDarkUI={isDarkUI} />

            {/* Publish */}
            <div className="pl-1">
                <button
                    onClick={onPublishClick}
                    className={`
                        h-8 px-4 rounded-lg text-xs font-bold flex items-center gap-2 border transition
                        ${isDarkUI
                            ? "bg-white text-black border-white hover:bg-gray-200"
                            : "bg-gray-100 text-black border-gray-200 hover:bg-gray-200"
                        }
                    `}
                >
                    <Rocket className="h-3.5 w-3.5" />
                    Publish
                </button>
            </div>
        </div>
    );
}

/* ================= Helpers ================= */

const Divider = ({ isDarkUI }) => (
    <div className={`w-px h-6 mx-1 ${isDarkUI ? "bg-white/10" : "bg-gray-200"}`} />
);

const ToolButton = ({ icon: Icon, label, isDarkUI }) => (
    <button
        className={`
            h-8 flex items-center gap-2 px-3 rounded-lg text-xs font-medium transition
            ${isDarkUI
                ? "text-gray-300 hover:bg-white/10 hover:text-white"
                : "text-gray-600 hover:bg-gray-100"
            }
        `}
    >
        <Icon className="h-4 w-4" />
        {label}
    </button>
);

const IconButton = ({ icon: Icon, isDarkUI }) => (
    <button
        className={`
            h-8 w-8 flex items-center justify-center rounded-lg transition
            ${isDarkUI
                ? "text-gray-400 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-black hover:bg-gray-100"
            }
        `}
    >
        <Icon className="h-4 w-4" />
    </button>
);
