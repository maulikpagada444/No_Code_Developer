'use client';
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../ThemeProvider";
import { useEditor } from "../Editor/EditorContext";
import {
    Smartphone,
    Tablet,
    Monitor,
    Undo2,
    Redo2,
    MousePointer2,
    MessageSquare,
    Rocket
} from 'lucide-react';
import { gsap } from "gsap";

export function BottomToolbar({
    viewMode = 'desktop',
    onViewChange,
    onPublishClick,
    isInteractMode = false,
    onInteractToggle,
    isChatOpen = false,
    onChatToggle,
}) {
    const { theme } = useContext(ThemeContext);
    const { undo, redo, canUndo, canRedo, historyLength, futureLength } = useEditor();
    const toolbarRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(toolbarRef.current,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.3 }
        );
    }, []);

    const handleUndo = () => {
        if (canUndo) {
            undo();
        }
    };

    const handleRedo = () => {
        if (canRedo) {
            redo();
        }
    };

    return (
        <div
            ref={toolbarRef}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 rounded-2xl glass-card border border-white/10 shadow-2xl"
        >
            {/* Undo/Redo */}
            <div className="flex items-center gap-1 px-2">
                <ToolbarButton
                    icon={Undo2}
                    tooltip={`Undo ${historyLength > 0 ? `(${historyLength})` : ''}`}
                    onClick={handleUndo}
                    disabled={!canUndo}
                />
                <ToolbarButton
                    icon={Redo2}
                    tooltip={`Redo ${futureLength > 0 ? `(${futureLength})` : ''}`}
                    onClick={handleRedo}
                    disabled={!canRedo}
                />
            </div>

            <Divider />

            {/* Interact Mode */}
            <button
                onClick={onInteractToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isInteractMode
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
            >
                <MousePointer2 size={16} />
                <span>{isInteractMode ? 'Interacting' : 'Interact'}</span>
            </button>

            {/* Chat Button */}
            <button
                onClick={onChatToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isChatOpen
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                title="Open Chat"
            >
                <MessageSquare size={16} />
                <span>Chat</span>
            </button>

            <Divider />

            {/* Device Buttons */}
            <div className="flex items-center gap-1 px-2">
                {[
                    { id: 'mobile', Icon: Smartphone },
                    { id: 'tablet', Icon: Tablet },
                    { id: 'desktop', Icon: Monitor },
                ].map(({ id, Icon }) => (
                    <button
                        key={id}
                        onClick={() => onViewChange?.(id)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${viewMode === id
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Icon size={16} />
                    </button>
                ))}
            </div>

            <Divider />

            {/* Publish Button */}
            <button
                onClick={onPublishClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all active:scale-95"
            >
                <Rocket size={16} />
                <span>Publish</span>
            </button>
        </div>
    );
}

const Divider = () => (
    <div className="w-px h-8 bg-white/10" />
);

const ToolbarButton = ({ icon: Icon, tooltip, onClick, disabled = false }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95 ${disabled
            ? 'text-gray-600 cursor-not-allowed opacity-50'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
        title={tooltip}
    >
        <Icon size={16} />
    </button>
);
