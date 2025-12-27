import React from 'react';
import {
    FiPlus, FiHome, FiUser, FiLayers, FiShoppingCart, FiMail, FiCpu,
    FiMessageCircle, FiHelpCircle, FiDollarSign, FiPackage, FiImage,
    FiVideo, FiCalendar
} from "react-icons/fi";

export const COLOR_MATRIX_OPTIONS = [
    ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A"],
    ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"],
    ["#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD", "#D4A373"],
    ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
    ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"],
    ["#8E9AAF", "#CBC0D3", "#EFD3D7", "#FEEAFA", "#DEE2FF"],
    ["#000000", "#14213D", "#FCA311", "#E5E5E5", "#FFFFFF"],
];

export const MODULES_OPTIONS = [
    { label: "Home", icon: <FiHome /> },
    { label: "About Us", icon: <FiUser /> },
    { label: "Services", icon: <FiLayers /> },
    { label: "E-Commerce", icon: <FiShoppingCart /> },
    { label: "Contact", icon: <FiMail /> },
    { label: "AI Blog", icon: <FiCpu /> },
    { label: "Portfolio", icon: <FiImage /> },
    { label: "Testimonials", icon: <FiMessageCircle /> },
    { label: "FAQ", icon: <FiHelpCircle /> },
    { label: "Pricing Tables", icon: <FiDollarSign /> },
    { label: "Products", icon: <FiPackage /> },
    { label: "Gallery", icon: <FiImage /> },
    { label: "Video Intro", icon: <FiVideo /> },
    { label: "Booking Sys", icon: <FiCalendar /> },
];

const ColorSelection = ({
    stepType, // 'color-matrix' | 'modules-selection'
    isDark,
    selected,
    setSelected,
    options, // Optional, can fall back to exports
    // Custom Color Props
    isCustomMode,
    customPalette,
    activeColorIndex,
    currentColor,
    setActiveColorIndex,
    setCurrentColor,
    handleColorChange,
    handleSaveCustom
}) => {
    if (stepType === 'color-matrix') {
        if (isCustomMode) {
            return (
                <div className={`
                    flex flex-col md:flex-row gap-8 mb-12 p-2 md:p-4
                `}>
                    {/* LEFT: PALETTE BARS */}
                    <div className={`
                        flex flex-1 h-64 md:h-96 rounded-3xl overflow-hidden
                        ${isDark ? "bg-[#1a1a1a]" : "bg-[#F0F0F0]"}
                    `}>
                        {customPalette.map((color, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setActiveColorIndex(i);
                                    setCurrentColor(color);
                                }}
                                className={`
                                    flex-1 h-full relative group cursor-pointer transition-all duration-300
                                    ${activeColorIndex === i ? "flex-[1.5]" : "flex-1 hover:flex-[1.2]"}
                                `}
                                style={{ backgroundColor: color }}
                            >
                                <div className={`
                                    absolute inset-0 flex items-center justify-center transition-opacity duration-300
                                    ${activeColorIndex === i ? "opacity-0" : "opacity-100"}
                                    ${color !== "#333333" && color !== "#F0F0F0" ? "mix-blend-difference text-white" : "text-gray-500"}
                                `}>
                                    <div className="flex flex-col items-center gap-2">
                                        <FiPlus className="text-xl" />
                                        <span className="text-xs font-semibold tracking-wide">Add Color</span>
                                    </div>
                                </div>

                                {/* Active Indicator Styling - Inner Border */}
                                {activeColorIndex === i && (
                                    <div className="absolute inset-0 border-[6px] border-white/20 z-10" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: PICKER CARD */}
                    <div className={`rounded-3xl p-6 flex flex-col gap-6 border
                        ${isDark
                            ? "bg-[#111] border-white/10"
                            : "bg-white border-gray-200 shadow-sm"
                        }
                    `}>
                        {/* Gradient Box */}
                        <div
                            className="w-full aspect-square rounded-2xl shadow-sm relative overflow-hidden"
                            style={{
                                background: `
                                    linear-gradient(to bottom, transparent, #000),
                                    linear-gradient(to right, #FFF, transparent),
                                    ${currentColor}
                                `
                            }}
                        >
                            {/* Simulated Handle */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-4 border-white rounded-full shadow-lg" />
                        </div>

                        {/* Controls */}
                        <div className="space-y-4">
                            {/* Hex Input */}
                            <div className={`
                                flex items-center justify-between px-4 py-3.5 rounded-xl border
                                ${isDark
                                    ? "bg-[#222] border-white/5"
                                    : "bg-[#F3F4F6] border-transparent"
                                }
                            `}>
                                <div className="flex items-center gap-3">
                                    <span className="opacity-40 text-lg">#</span>
                                    <input
                                        type="text"
                                        value={currentColor.replace("#", "")}
                                        onChange={(e) => handleColorChange({ target: { value: "#" + e.target.value } })}
                                        className="bg-transparent outline-none uppercase font-mono text-sm w-32 tracking-wider font-medium"
                                    />
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${isDark ? "bg-white/10" : "bg-white text-gray-400"}`}>
                                    100%
                                </div>
                            </div>

                            <button
                                onClick={handleSaveCustom}
                                className={`
                                    w-full py-3.5 rounded-full font-semibold text-sm transition-transform active:scale-[0.98]
                                    ${isDark
                                        ? "bg-white text-black hover:bg-gray-200"
                                        : "bg-[#F3F4F6] text-black border border-gray-200 hover:bg-gray-200 hover:border-gray-300"
                                    }
                                `}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        // Standard Color Matrix View
        const matrixOptions = options || COLOR_MATRIX_OPTIONS;

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {matrixOptions.map((palette, i) => (
                    <div
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`
                            rounded-2xl p-3 cursor-pointer transition border flex flex-col items-center justify-center
                            ${selected === i
                                ? isDark
                                    ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : "border-black shadow-md"
                                : isDark
                                    ? "border-white/10 hover:bg-white/5"
                                    : "border-gray-300 hover:bg-gray-50"
                            }
                        `}
                    >
                        <div className="flex w-full h-24 rounded-lg overflow-hidden">
                            {palette.map((color, cIndex) => (
                                <div
                                    key={cIndex}
                                    style={{ backgroundColor: color }}
                                    className="flex-1 h-full"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (stepType === 'modules-selection') {
        const modulesOptions = options || MODULES_OPTIONS;

        return (
            <div className="mb-16">
                {/* Card Header for Available Modules */}
                <div className={`
                    flex items-center justify-between px-6 py-4 rounded-t-2xl border-b
                    ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}
                `}>
                    <div className="flex items-center gap-2 text-sm font-semibold opacity-80">
                        <FiLayers /> AVAILABLE MODULES
                    </div>
                    <div className={`
                        px-3 py-1 rounded-full text-xs font-medium border
                        ${isDark ? "bg-black/30 border-white/10" : "bg-white border-gray-300"}
                    `}>
                        Selected: {Array.isArray(selected) ? selected.length : 0} / 4
                    </div>
                </div>

                {/* Grid Container */}
                <div className={`
                    p-6 rounded-b-2xl border border-t-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
                    ${isDark ? "bg-[#111] border-white/10" : "bg-gray-50 border-gray-200"}
                `}>
                    {modulesOptions.map((option, i) => {
                        const isSelected = Array.isArray(selected) && selected.includes(option.label);
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    const current = Array.isArray(selected) ? selected : [];
                                    if (isSelected) {
                                        setSelected(current.filter(item => item !== option.label));
                                    } else {
                                        if (current.length < 4) {
                                            setSelected([...current, option.label]);
                                        }
                                    }
                                }}
                                className={`
                                    relative flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all text-left group
                                    ${isSelected
                                        ? isDark
                                            ? "bg-white text-black border-white"
                                            : "bg-black text-white border-black"
                                        : isDark
                                            ? "bg-white/5 border-white/5 hover:bg-white/10"
                                            : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                    }
                                `}
                            >
                                <span className={`text-lg ${isSelected ? "opacity-100" : "opacity-60"}`}>
                                    {option.icon}
                                </span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-sm font-medium">{option.label}</span>
                                    <span className="text-[10px] opacity-60 mt-0.5">Module</span>
                                </div>

                                {/* Dot Indicator */}
                                {isSelected && (
                                    <div className={`
                                        absolute right-4 w-2 h-2 rounded-full
                                        ${isDark ? "bg-black" : "bg-white"}
                                    `} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
};

export default ColorSelection;
