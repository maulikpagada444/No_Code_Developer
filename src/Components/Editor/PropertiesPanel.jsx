
import React, { useContext, useState, useEffect } from 'react';
import { useEditor } from './EditorContext';
import { X, Check, Image as ImageIcon } from 'lucide-react';
import { ThemeContext } from '../../ThemeProvider';

const PropertiesPanel = () => {
    const { selectedElement, setSelectedElement, updateElementProperty, saveChanges, cancelChanges } = useEditor();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    if (!selectedElement) return null;

    // Helper to safely get values
    const val = (v) => v || '';

    const handleTextChange = (e) => {
        updateElementProperty('text', e.target.value);
    };

    const handleClassChange = (e) => {
        updateElementProperty('classes', e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateElementProperty('src', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        saveChanges();
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 2000);
    };

    const handleCancel = () => {
        cancelChanges();
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

                {/* Image Source - ONLY FOR IMG TAGS */}
                {selectedElement.tagName === 'img' && (
                    <div className="space-y-3">
                        <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Image Source
                        </label>

                        {/* Current Image Preview */}
                        {selectedElement.src && (
                            <div className={`relative aspect-video rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                <img
                                    src={selectedElement.src}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className={`
                                cursor-pointer flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg transition-all
                                ${isDark
                                    ? 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-400 hover:text-blue-400'
                                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-500 hover:text-blue-600'}
                            `}>
                                <ImageIcon size={18} />
                                <span className="text-sm font-medium">Choose New Image</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>

                            <input
                                type="text"
                                className={`w-full p-3 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                    ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                    }`}
                                value={val(selectedElement.src)}
                                onChange={(e) => updateElementProperty('src', e.target.value)}
                                placeholder="Or enter image URL..."
                            />
                        </div>
                    </div>
                )}

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

            {/* Save & Cancel Buttons */}
            <div className={`p-5 border-t flex gap-3 ${isDark ? 'border-white/10 bg-[#1a1a1a]' : 'border-gray-200 bg-white'
                }`}>
                {showSaveSuccess ? (
                    <div className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${isDark ? 'bg-green-600 text-white' : 'bg-green-600 text-white'
                        }`}>
                        <Check size={18} />
                        Saved Successfully!
                    </div>
                ) : (
                    <>
                        <button
                            onClick={handleSave}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${isDark
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                        >
                            <Check size={18} />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${isDark
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                }`}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PropertiesPanel;