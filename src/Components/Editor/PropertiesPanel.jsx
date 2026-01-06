
import React, { useContext, useState, useEffect } from 'react';
import { useEditor } from './EditorContext';
import {
    X, Check, Image as ImageIcon, Type, Palette, Box, Layout,
    Link as LinkIcon, Eye, EyeOff, Copy, Trash2, Code,
    AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
    Settings, ChevronDown, ChevronUp, Maximize2, Move
} from 'lucide-react';
import { ThemeContext } from '../../ThemeProvider';

const PropertiesPanel = () => {
    const { selectedElement, setSelectedElement, updateElementProperty, saveChanges, cancelChanges } = useEditor();
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    // Accordion states for collapsible sections
    const [sectionsExpanded, setSectionsExpanded] = useState({
        basic: true,
        text: true,
        styling: true,
        layout: false,
        spacing: false,
        typography: false,
        effects: false,
        advanced: false
    });

    if (!selectedElement) return null;

    // Helper to safely get values
    const val = (v) => v || '';

    const toggleSection = (section) => {
        setSectionsExpanded(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleTextChange = (e) => {
        updateElementProperty('text', e.target.value);
    };

    const handleClassChange = (e) => {
        updateElementProperty('classes', e.target.value);
    };

    const handleStyleChange = (property, value) => {
        const currentStyles = selectedElement.styles || {};
        updateElementProperty('styles', { ...currentStyles, [property]: value });
    };

    const handleAttributeChange = (attr, value) => {
        updateElementProperty(attr, value);
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

    // Section Header Component
    const SectionHeader = ({ title, icon: Icon, expanded, section }) => (
        <button
            onClick={() => toggleSection(section)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${isDark
                ? 'hover:bg-white/5 text-white'
                : 'hover:bg-gray-100 text-gray-900'
                }`}
        >
            <div className="flex items-center gap-2">
                <Icon size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <span className="font-semibold text-sm">{title}</span>
            </div>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
    );

    return (
        <div className={`h-full flex flex-col border-l shadow-xl z-50 w-[340px] ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
            }`}>
            {/* Header */}
            <div className={`h-14 border-b flex items-center justify-between px-5 ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
                }`}>
                <div className="flex items-center gap-2">
                    <Settings size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Edit Element
                    </span>
                </div>
                <button
                    onClick={() => setSelectedElement(null)}
                    className={`transition ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    <X size={20} />
                </button>
            </div>

            {/* Content Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">

                {/* BASIC INFO SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Basic Info" icon={Type} expanded={sectionsExpanded.basic} section="basic" />

                    {sectionsExpanded.basic && (
                        <div className="p-4 space-y-4">
                            {/* Tag (Read-only) */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Element Tag
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                    value={val(selectedElement.tagName?.toUpperCase())}
                                    readOnly
                                />
                            </div>

                            {/* ID Attribute */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Element ID
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    value={val(selectedElement.id)}
                                    onChange={(e) => handleAttributeChange('id', e.target.value)}
                                    placeholder="element-id"
                                />
                            </div>

                            {/* Visibility Toggle */}
                            <div className="flex items-center justify-between">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Visibility
                                </label>
                                <button
                                    onClick={() => {
                                        const isHidden = selectedElement.classes?.includes('hidden');
                                        const newClasses = isHidden
                                            ? selectedElement.classes.replace('hidden', '').trim()
                                            : `${selectedElement.classes || ''} hidden`.trim();
                                        updateElementProperty('classes', newClasses);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isDark
                                        ? 'bg-[#2a2a2a] hover:bg-[#333] text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                >
                                    {selectedElement.classes?.includes('hidden') ? (
                                        <><EyeOff size={16} /> Hidden</>
                                    ) : (
                                        <><Eye size={16} /> Visible</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* IMAGE SECTION - Only for IMG tags */}
                {selectedElement.tagName === 'img' && (
                    <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                        }`}>
                        <SectionHeader title="Image" icon={ImageIcon} expanded={sectionsExpanded.basic} section="basic" />

                        <div className="p-4 space-y-3">
                            {/* Current Image Preview */}
                            {selectedElement.src && (
                                <div className={`relative aspect-video rounded-lg overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'
                                    }`}>
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
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    value={val(selectedElement.src)}
                                    onChange={(e) => updateElementProperty('src', e.target.value)}
                                    placeholder="Or enter image URL..."
                                />

                                {/* Alt Text */}
                                <input
                                    type="text"
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    value={val(selectedElement.alt)}
                                    onChange={(e) => handleAttributeChange('alt', e.target.value)}
                                    placeholder="Alt text (for accessibility)"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* LINK SECTION - Only for A tags */}
                {selectedElement.tagName === 'a' && (
                    <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                        }`}>
                        <SectionHeader title="Link" icon={LinkIcon} expanded={sectionsExpanded.basic} section="basic" />

                        <div className="p-4 space-y-3">
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    URL (href)
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    value={val(selectedElement.href)}
                                    onChange={(e) => handleAttributeChange('href', e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Target
                                </label>
                                <select
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    value={val(selectedElement.target)}
                                    onChange={(e) => handleAttributeChange('target', e.target.value)}
                                >
                                    <option value="">Same Tab (_self)</option>
                                    <option value="_blank">New Tab (_blank)</option>
                                    <option value="_parent">Parent Frame</option>
                                    <option value="_top">Full Window</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* TEXT CONTENT SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Text Content" icon={Type} expanded={sectionsExpanded.text} section="text" />

                    {sectionsExpanded.text && (
                        <div className="p-4 space-y-3">
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

                            {/* Quick Text Formatting */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        const hasBold = selectedElement.classes?.includes('font-bold');
                                        const newClasses = hasBold
                                            ? selectedElement.classes.replace('font-bold', '').trim()
                                            : `${selectedElement.classes || ''} font-bold`.trim();
                                        updateElementProperty('classes', newClasses);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${selectedElement.classes?.includes('font-bold')
                                        ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                                        : isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Bold"
                                >
                                    <Bold size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        const hasItalic = selectedElement.classes?.includes('italic');
                                        const newClasses = hasItalic
                                            ? selectedElement.classes.replace('italic', '').trim()
                                            : `${selectedElement.classes || ''} italic`.trim();
                                        updateElementProperty('classes', newClasses);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${selectedElement.classes?.includes('italic')
                                        ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                                        : isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Italic"
                                >
                                    <Italic size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        const hasUnderline = selectedElement.classes?.includes('underline');
                                        const newClasses = hasUnderline
                                            ? selectedElement.classes.replace('underline', '').trim()
                                            : `${selectedElement.classes || ''} underline`.trim();
                                        updateElementProperty('classes', newClasses);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${selectedElement.classes?.includes('underline')
                                        ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                                        : isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Underline"
                                >
                                    <Underline size={16} />
                                </button>
                            </div>

                            {/* Text Alignment */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        let classes = selectedElement.classes || '';
                                        classes = classes.replace(/text-(left|center|right|justify)/g, '').trim();
                                        classes = `${classes} text-left`.trim();
                                        updateElementProperty('classes', classes);
                                    }}
                                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg transition-all ${isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Align Left"
                                >
                                    <AlignLeft size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        let classes = selectedElement.classes || '';
                                        classes = classes.replace(/text-(left|center|right|justify)/g, '').trim();
                                        classes = `${classes} text-center`.trim();
                                        updateElementProperty('classes', classes);
                                    }}
                                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg transition-all ${isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Align Center"
                                >
                                    <AlignCenter size={16} />
                                </button>
                                <button
                                    onClick={() => {
                                        let classes = selectedElement.classes || '';
                                        classes = classes.replace(/text-(left|center|right|justify)/g, '').trim();
                                        classes = `${classes} text-right`.trim();
                                        updateElementProperty('classes', classes);
                                    }}
                                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg transition-all ${isDark ? 'bg-[#2a2a2a] hover:bg-[#333] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                        }`}
                                    title="Align Right"
                                >
                                    <AlignRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* STYLING SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Styling & Classes" icon={Palette} expanded={sectionsExpanded.styling} section="styling" />

                    {sectionsExpanded.styling && (
                        <div className="p-4 space-y-3">
                            {/* Tailwind Classes */}
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

                            {/* Quick Color Presets */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Quick Background Colors
                                </label>
                                <div className="grid grid-cols-6 gap-2">
                                    {['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'].map(color => (
                                        <button
                                            key={color}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/bg-\S+/g, '').trim();
                                                classes = `${classes} ${color}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`${color} h-8 rounded-lg border-2 ${isDark ? 'border-white/20' : 'border-gray-300'
                                                } hover:scale-110 transition-transform`}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* LAYOUT SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Layout & Display" icon={Layout} expanded={sectionsExpanded.layout} section="layout" />

                    {sectionsExpanded.layout && (
                        <div className="p-4 space-y-4">
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
                            </div>

                            {/* Display Type Quick Toggles */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Display Type
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['block', 'inline-block', 'flex', 'grid', 'inline', 'hidden'].map(display => (
                                        <button
                                            key={display}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/\b(block|inline-block|inline|flex|grid|hidden)\b/g, '').trim();
                                                classes = `${classes} ${display}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {display}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* SPACING SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Spacing" icon={Maximize2} expanded={sectionsExpanded.spacing} section="spacing" />

                    {sectionsExpanded.spacing && (
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
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

                            {/* Quick Padding Presets */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Quick Padding
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['p-0', 'p-2', 'p-4', 'p-6', 'p-8', 'p-10', 'p-12', 'p-16'].map(padding => (
                                        <button
                                            key={padding}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/\bp-\d+/g, '').trim();
                                                classes = `${classes} ${padding}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {padding}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* TYPOGRAPHY SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Typography" icon={Type} expanded={sectionsExpanded.typography} section="typography" />

                    {sectionsExpanded.typography && (
                        <div className="p-4 space-y-3">
                            {/* Font Size */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Font Size
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/g, '').trim();
                                                classes = `${classes} ${size}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {size.split('-')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Font Weight */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Font Weight
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold'].map(weight => (
                                        <button
                                            key={weight}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/font-(light|normal|medium|semibold|bold|extrabold)/g, '').trim();
                                                classes = `${classes} ${weight}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {weight.split('-')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* EFFECTS SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Effects & Borders" icon={Box} expanded={sectionsExpanded.effects} section="effects" />

                    {sectionsExpanded.effects && (
                        <div className="p-4 space-y-3">
                            {/* Border Radius */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Border Radius
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['rounded-none', 'rounded-sm', 'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl', 'rounded-full'].map(radius => (
                                        <button
                                            key={radius}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?/g, '').trim();
                                                classes = `${classes} ${radius}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {radius.includes('-') ? radius.split('-')[1] : 'base'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Shadow */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Shadow
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['shadow-none', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'].map(shadow => (
                                        <button
                                            key={shadow}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/shadow(-none|-sm|-md|-lg|-xl|-2xl)?/g, '').trim();
                                                classes = `${classes} ${shadow}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {shadow.includes('-') ? shadow.split('-')[1] : 'base'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Opacity */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Opacity
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-100'].map(opacity => (
                                        <button
                                            key={opacity}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/opacity-\d+/g, '').trim();
                                                classes = `${classes} ${opacity}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {opacity.split('-')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ADVANCED SECTION */}
                <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <SectionHeader title="Advanced" icon={Code} expanded={sectionsExpanded.advanced} section="advanced" />

                    {sectionsExpanded.advanced && (
                        <div className="p-4 space-y-3">
                            {/* Position */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Position
                                </label>
                                <select
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    onChange={(e) => {
                                        let classes = selectedElement.classes || '';
                                        classes = classes.replace(/\b(static|fixed|absolute|relative|sticky)\b/g, '').trim();
                                        classes = `${classes} ${e.target.value}`.trim();
                                        updateElementProperty('classes', classes);
                                    }}
                                >
                                    <option value="static">Static</option>
                                    <option value="relative">Relative</option>
                                    <option value="absolute">Absolute</option>
                                    <option value="fixed">Fixed</option>
                                    <option value="sticky">Sticky</option>
                                </select>
                            </div>

                            {/* Z-Index */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Z-Index
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['z-0', 'z-10', 'z-20', 'z-30', 'z-40', 'z-50'].map(zIndex => (
                                        <button
                                            key={zIndex}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/z-\d+/g, '').trim();
                                                classes = `${classes} ${zIndex}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {zIndex.split('-')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Overflow */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Overflow
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['overflow-visible', 'overflow-hidden', 'overflow-scroll', 'overflow-auto'].map(overflow => (
                                        <button
                                            key={overflow}
                                            onClick={() => {
                                                let classes = selectedElement.classes || '';
                                                classes = classes.replace(/overflow-(visible|hidden|scroll|auto)/g, '').trim();
                                                classes = `${classes} ${overflow}`.trim();
                                                updateElementProperty('classes', classes);
                                            }}
                                            className={`px-2 py-1.5 rounded text-xs font-medium transition-all ${isDark
                                                ? 'bg-[#2a2a2a] hover:bg-blue-600 text-white'
                                                : 'bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900'
                                                }`}
                                        >
                                            {overflow.split('-')[1]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cursor */}
                            <div className="space-y-2">
                                <label className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    Cursor
                                </label>
                                <select
                                    className={`w-full p-2.5 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none ${isDark
                                        ? 'bg-[#2a2a2a] border-white/10 text-white focus:bg-[#333]'
                                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white'
                                        }`}
                                    onChange={(e) => {
                                        let classes = selectedElement.classes || '';
                                        classes = classes.replace(/cursor-\S+/g, '').trim();
                                        classes = `${classes} ${e.target.value}`.trim();
                                        updateElementProperty('classes', classes);
                                    }}
                                >
                                    <option value="cursor-auto">Auto</option>
                                    <option value="cursor-pointer">Pointer</option>
                                    <option value="cursor-not-allowed">Not Allowed</option>
                                    <option value="cursor-wait">Wait</option>
                                    <option value="cursor-text">Text</option>
                                    <option value="cursor-move">Move</option>
                                </select>
                            </div>
                        </div>
                    )}
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