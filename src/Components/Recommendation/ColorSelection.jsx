import React from "react";
import { FiPlus } from "react-icons/fi";

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

const ColorSelection = ({
    isDark,
    selected,
    setSelected,
    options = COLOR_MATRIX_OPTIONS,

    // Custom Color Props
    isCustomMode,
    customPalette,
    activeColorIndex,
    currentColor,
    setActiveColorIndex,
    setCurrentColor,
    handleColorChange,
    handleSaveCustom,
}) => {
    /* ================= CUSTOM MODE ================= */
    if (isCustomMode) {
        return (
            <div className="flex flex-col md:flex-row gap-8 mb-12 p-2 md:p-4">
                {/* LEFT: PALETTE */}
                <div
                    className={`
            flex flex-1 h-64 md:h-96 rounded-3xl overflow-hidden
            ${isDark ? "bg-[#1a1a1a]" : "bg-[#F0F0F0]"}
          `}
                >
                    {customPalette.map((color, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                setActiveColorIndex(i);
                                setCurrentColor(color);
                            }}
                            className={`
                flex-1 h-full relative group cursor-pointer transition-all duration-300
                ${activeColorIndex === i ? "flex-[1.5]" : "hover:flex-[1.2]"}
              `}
                            style={{ backgroundColor: color }}
                        >
                            {/* Overlay */}
                            {activeColorIndex !== i && (
                                <div
                                    className={`
                    absolute inset-0 flex items-center justify-center
                    ${color !== "#333333" && color !== "#F0F0F0"
                                            ? "mix-blend-difference text-white"
                                            : "text-gray-500"}
                  `}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <FiPlus className="text-xl" />
                                        <span className="text-xs font-semibold">Add Color</span>
                                    </div>
                                </div>
                            )}

                            {/* Active Border */}
                            {activeColorIndex === i && (
                                <div className="absolute inset-0 border-[6px] border-white/20" />
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT: PICKER */}
                <div
                    className={`
            rounded-3xl p-6 flex flex-col gap-6 border
            ${isDark
                            ? "bg-[#111] border-white/10"
                            : "bg-white border-gray-200 shadow-sm"}
          `}
                >
                    {/* Preview */}
                    <div
                        className="w-full aspect-square rounded-2xl relative overflow-hidden"
                        style={{
                            background: `
                linear-gradient(to bottom, transparent, #000),
                linear-gradient(to right, #FFF, transparent),
                ${currentColor}
              `,
                        }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-4 border-white rounded-full shadow-lg" />
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                        {/* Hex Input */}
                        <div
                            className={`
                flex items-center justify-between px-4 py-3.5 rounded-xl border
                ${isDark
                                    ? "bg-[#222] border-white/5"
                                    : "bg-[#F3F4F6] border-transparent"}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <span className="opacity-40">#</span>
                                <input
                                    type="text"
                                    value={currentColor.replace("#", "")}
                                    onChange={(e) =>
                                        handleColorChange({
                                            target: { value: "#" + e.target.value },
                                        })
                                    }
                                    className="bg-transparent outline-none font-mono text-sm uppercase w-32"
                                />
                            </div>
                            <span className="text-[10px] opacity-60 font-bold">100%</span>
                        </div>

                        <button
                            onClick={handleSaveCustom}
                            className={`
                w-full py-3.5 rounded-full font-semibold text-sm
                ${isDark
                                    ? "bg-white text-black hover:bg-gray-200"
                                    : "bg-gray-100 border hover:bg-gray-200"}
              `}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ================= MATRIX MODE ================= */
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {options.map((palette, i) => (
                <div
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`
            rounded-2xl p-3 cursor-pointer transition border
            ${selected === i
                            ? isDark
                                ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "border-black shadow-md"
                            : isDark
                                ? "border-white/10 hover:bg-white/5"
                                : "border-gray-300 hover:bg-gray-50"}
          `}
                >
                    <div className="flex w-full h-24 rounded-lg overflow-hidden">
                        {palette.map((color, idx) => (
                            <div
                                key={idx}
                                className="flex-1 h-full"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorSelection;
