import React from "react";
import {
    FiHome,
    FiUser,
    FiLayers,
    FiShoppingCart,
    FiMail,
    FiCpu,
    FiMessageCircle,
    FiHelpCircle,
    FiDollarSign,
    FiPackage,
    FiImage,
    FiVideo,
    FiCalendar,
} from "react-icons/fi";

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

const FeaturesSelection = ({
    isDark,
    selected = [],
    setSelected,
    options = MODULES_OPTIONS,
}) => {
    return (
        <div className="mb-16">
            {/* Header */}
            <div
                className={`
          flex items-center justify-between px-6 py-4 rounded-t-2xl border-b
          ${isDark ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"}
        `}
            >
                <div className="flex items-center gap-2 text-sm font-semibold opacity-80">
                    <FiLayers /> AVAILABLE MODULES
                </div>
                <div
                    className={`
            px-3 py-1 rounded-full text-xs font-medium border
            ${isDark ? "bg-black/30 border-white/10" : "bg-white border-gray-300"}
          `}
                >
                    Selected: {selected.length} / 4
                </div>
            </div>

            {/* Grid */}
            <div
                className={`
          p-6 rounded-b-2xl border border-t-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
          ${isDark ? "bg-[#111] border-white/10" : "bg-gray-50 border-gray-200"}
        `}
            >
                {options.map((option, i) => {
                    const isSelected = selected.includes(option.label);

                    return (
                        <button
                            key={i}
                            onClick={() => {
                                if (isSelected) {
                                    setSelected(selected.filter(item => item !== option.label));
                                } else if (selected.length < 4) {
                                    setSelected([...selected, option.label]);
                                }
                            }}
                            className={`
                relative flex items-center gap-3 px-5 py-3.5 rounded-full border transition-all text-left
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

                            {isSelected && (
                                <div
                                    className={`
                    absolute right-4 w-2 h-2 rounded-full
                    ${isDark ? "bg-black" : "bg-white"}
                  `}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturesSelection;
