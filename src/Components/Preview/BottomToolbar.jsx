'use client';
// import { Button } from '@/Web-Builder/components/ui/button';
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
// import { cn } from '@/Web-Builder/lib/utils';
export function BottomToolbar({
    viewMode = 'desktop',
    onViewChange,
    onPublishClick,
}) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-2xl">
            {/* History Controls */}
            <div className="flex items-center gap-1 px-1">
                <button size="icon" className="h-8 w-8 text-gray-500 hover:text-black">
                    <Undo2 className="h-4 w-4" />
                </button>
                <button size="icon" className="h-8 w-8 text-gray-500 hover:text-black">
                    <Redo2 className="h-4 w-4" />
                </button>
            </div>
            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            {/* Tools Section */}
            <div className="flex items-center gap-1 px-1">
                <button variant="ghost" size="sm" className="h-8 flex items-center gap-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Paperclip className="h-4 w-4" />
                    <span className="text-xs font-medium">Attach</span>
                </button>
                <button variant="ghost" size="sm" className="h-8 flex items-center gap-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <MousePointer2 className="h-4 w-4" />
                    <span className="text-xs font-medium">Interact</span>
                </button>
                <button className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    <Type className="h-4 w-4" />
                </button>
                <button variant="ghost" size="icon" className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageSquare className="h-4 w-4" />
                </button>
            </div>
            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            {/* Device Toggles */}
            <div className="flex items-center gap-1 px-1">
                {[
                    { id: 'mobile', Icon: Smartphone },
                    { id: 'tablet', Icon: Tablet },
                    { id: 'desktop', Icon: Monitor }
                ].map(({ id, Icon }) => (
                    <button
                        key={id}
                        onClick={() => onViewChange?.(id)}
                        className={`h-8 w-8 flex items-center justify-center rounded-lg transition-all ${viewMode === id
                            ? "border-2 border-black text-black bg-transparent"
                            : "border border-transparent text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                ))}
            </div>
            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            {/* Publish Action */}
            <div className="pl-1">
                <button
                    onClick={onPublishClick}
                    className="h-8 bg-gray-100 hover:bg-gray-200 text-black border border-gray-200 rounded-lg gap-2 px-4 shadow-sm"
                >
                    <Rocket className="h-3.5 w-3.5" />
                    <span className="text-xs font-bold">Publish</span>
                </button>
            </div>
        </div>
    );
}