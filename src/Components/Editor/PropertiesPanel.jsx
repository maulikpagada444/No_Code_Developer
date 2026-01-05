
import React, { useContext } from 'react';
import { useEditor } from './EditorContext';
import { X } from 'lucide-react';
import { ThemeContext } from '../../ThemeProvider';

const PropertiesPanel = () => {
    const { selectedElement, setSelectedElement, updateElementProperty } = useEditor();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    if (!selectedElement) return null;

    // Helper to safely get values
    const val = (v) => v || '';

    const handleTextChange = (e) => {
        updateElementProperty('text', e.target.value);
    };

    const handleClassChange = (e) => {
        updateElementProperty('classes', e.target.value);
    };

    return (
        <div className={`h-full flex flex-col border-l shadow-xl z-50 w-[320px] ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
            {/* Header */}
            <div className={`h-14 border-b flex items-center justify-between px-5 ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
                }`}>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Edit Element
                </span>
                <button
                    onClick={() => setSelectedElement(null)}
                    className={`transition ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Tag */}
                <div className="space-y-2">
                    <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        Tag
                    </label>
                    <input
                        type="text"
                        className={`w-full p-3 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                            }`}
                        value={val(selectedElement.tagName)}
                        readOnly
                    />
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Tag cannot be changed
                    </p>
                </div>

                {/* Text Content - EDITABLE */}
                <div className="space-y-2">
                    <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        Text Content
                    </label>
                    <textarea
                        className={`w-full p-3 border rounded-lg text-sm transition-all resize-y min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                            }`}
                        rows={3}
                        value={val(selectedElement.text)}
                        onChange={handleTextChange}
                        placeholder="Enter text content..."
                    />
                </div>

                {/* Tailwind Classes - EDITABLE */}
                <div className="space-y-2">
                    <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        Tailwind Classes
                    </label>
                    <textarea
                        className={`w-full p-3 border rounded-lg text-sm font-mono resize-y min-h-[100px] transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                            }`}
                        rows={4}
                        value={val(selectedElement.classes)}
                        onChange={handleClassChange}
                        placeholder="Enter Tailwind classes..."
                    />
                </div>

                {/* Layout Section - READ ONLY */}
                <div className={`p-4 border rounded-xl space-y-4 ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Layout (Computed)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Width
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={val(selectedElement.styles?.width) || 'Auto'}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Height
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={val(selectedElement.styles?.height) || 'Auto'}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Padding
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={val(selectedElement.styles?.padding) || ''}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Margin
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md text-sm ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                    }`}
                                value={val(selectedElement.styles?.margin) || ''}
                                readOnly
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PropertiesPanel;