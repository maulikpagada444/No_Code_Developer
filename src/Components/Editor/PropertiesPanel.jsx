
import React from 'react';
import { useEditor } from './EditorContext';
import { X } from 'lucide-react';

const PropertiesPanel = () => {
    const { selectedElement, setSelectedElement } = useEditor();

    if (!selectedElement) return null;

    // Helper to safely get values
    const val = (v) => v || '';

    return (
        <div className="h-full flex flex-col bg-white border-l shadow-xl z-50 w-[320px]">
            {/* Header */}
            <div className="h-14 border-b flex items-center justify-between px-5 bg-white">
                <span className="font-bold text-gray-800">Edit Element</span>
                <button
                    onClick={() => setSelectedElement(null)}
                    className="text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content Form */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Tag */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500">Tag</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        value={val(selectedElement.tagName)}
                        readOnly
                    />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500">Text Content</label>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-y min-h-[80px]"
                        rows={3}
                        value={val(selectedElement.text)}
                        readOnly
                    />
                </div>

                {/* Tailwind Classes */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500">Tailwind Classes</label>
                    <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-mono resize-y min-h-[100px]"
                        rows={4}
                        value={val(selectedElement.classes)}
                        readOnly
                    />
                </div>

                {/* Layout Section */}
                <div className="p-4 border border-gray-200 rounded-xl space-y-4">
                    <h4 className="font-medium text-gray-900 text-sm">Layout</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-500">Width</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
                                value={val(selectedElement.styles?.width) || 'Auto'}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-500">Height</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
                                value={val(selectedElement.styles?.height) || 'Auto'}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-500">Padding</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
                                value={val(selectedElement.styles?.padding) || ''}
                                readOnly
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs text-gray-500">Margin</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50"
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