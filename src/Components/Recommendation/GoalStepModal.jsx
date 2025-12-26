import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiPhone,
    FiSearch,
    FiShoppingCart,
    FiCpu,
    FiPenTool,
    FiActivity,
    FiBriefcase,
    FiCoffee,
    FiChevronDown,
    FiChevronsRight,
    FiPlus,
    FiHome,
    FiUser,
    FiLayers,
    FiMail,
    FiMessageCircle,
    FiHelpCircle,
    FiDollarSign,
    FiPackage,
    FiImage,
    FiVideo,
    FiCalendar
} from "react-icons/fi";
import Header from "./Header.jsx";
import { ThemeContext } from "../../ThemeProvider.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

/* ---------------- STEPS CONFIG ---------------- */

const steps = [
    {
        type: "cards",
        title: "What is your primary goal?",
        subtitle:
            "Jarvis will restructure your site's DNA based on this selection.",
        options: [
            { title: "Get more calls", desc: "Optimize layout for direct contact and lead generation." },
            { title: "Sell products", desc: "Optimize layout for direct contact and lead generation." },
            { title: "Build brand presence", desc: "Optimize layout for direct contact and lead generation." },
        ],
    },
    {
        type: "search",
        title: "Describe your Business",
        subtitle:
            "Which industries does your project operate in? Select all that apply.",
        placeholder: "Optimize layout for direct contact and lead generation.",
        options: [
            "Retail & E-Com",
            "Technology & SaaS",
            "Creative & Arts",
            "Health & Wellness",
            "Professional Svcs",
            "Food & Beverage",
        ],
    },
    {
        type: "textarea",
        title: "Who is your target audience?",
        subtitle:
            "Describe who you want to reach. The AI will analyze this to generate tailored copy, imagery styles, and layout structures that resonate.",
        placeholder: "Optimize layout for direct contact and lead generation.",
    },
    {
        type: "yesno",
        title: "Do you already have a website?",
        subtitle: "This helps us decide whether to redesign or create from scratch.",
    },
    {
        type: "icon-grid",
        title: "Does your site need Online Booking?",
        subtitle: "We'll automatically configure a calendar system and payment gateway for your services.",
        options: [
            { label: "Retail & E-Com", icon: <FiShoppingCart /> },
            { label: "Technology & SaaS", icon: <FiCpu /> },
            { label: "Creative & Arts", icon: <FiPenTool /> },
            { label: "Health & Wellness", icon: <FiActivity /> },
            { label: "Professional Svcs", icon: <FiBriefcase /> },
            { label: "Food & Beverage", icon: <FiCoffee /> },
        ],
    },
    {
        type: "color-matrix",
        title: "Select A Color Matrix",
        subtitle: "Choose up to 4 features. Jarvis will architect the neural pathways for the rest.",
        options: [
            ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A"],
            ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"],
            ["#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD", "#D4A373"],
            ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
            ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
            ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"],
            ["#8E9AAF", "#CBC0D3", "#EFD3D7", "#FEEAFA", "#DEE2FF"],
            ["#000000", "#14213D", "#FCA311", "#E5E5E5", "#FFFFFF"],
        ]
    },
    {
        type: "modules-selection",
        title: "Select Core Modules",
        subtitle: "Choose up to 4 features. Jarvis will architect the neural pathways for the rest.",
        options: [
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
        ]
    }
];

/* ---------------- COMPONENT ---------------- */

const GoalStepModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    // Custom Color State
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customPalette, setCustomPalette] = useState(["#333333", "#444444", "#555555", "#666666", "#777777"]);
    const [activeColorIndex, setActiveColorIndex] = useState(0);
    const [currentColor, setCurrentColor] = useState("#FFFFFF");

    const step = steps[stepIndex];

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setCurrentColor(newColor);
        const newPalette = [...customPalette];
        newPalette[activeColorIndex] = newColor;
        setCustomPalette(newPalette);
    };

    const handleSaveCustom = () => {
        // Logic to persist customPalette would go here
        nextStep();
    };

    const nextStep = () => {
        if (stepIndex < steps.length - 1) {
            setSelected(null);
            setIsCustomMode(false);
            setStepIndex(stepIndex + 1);
        } else {
            navigate('/project/preview');
        }
    };

    const handleCustomColorClick = () => {
        setIsCustomMode(true);
        // Reset selection in custom mode
        setSelected(null);
    };

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                backgroundColor: isDark ? "#000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* HEADER */}
            <Header />

            {/* GRID OVERLAY */}
            <div
                className="
                    absolute inset-0 pointer-events-none
                    bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),
                    linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
                    bg-[size:40px_40px]
                "
            />

            {/* CENTER CARD */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
                <div
                    className={`
                        w-full max-w-5xl rounded-[28px] p-12
                        border backdrop-blur-xl
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        ${isDark
                            ? "bg-black/70 border-white/10 text-white"
                            : "bg-white border-gray-300 text-black"
                        }
                    `}
                >
                    {/* TOP BAR */}
                    <div className="flex justify-between text-xs mb-6 opacity-70">
                        <span>INITIALIZING ENGINE......</span>
                        <span>STEP {String(stepIndex + 1).padStart(2, "0")} / 07</span>
                    </div>

                    {/* <div className={`h-px mb-10 ${isDark ? "bg-white/10" : "bg-gray-300"}`} /> */}

                    {/* TITLE */}
                    <div className={`${step.type === "color-matrix" ? "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left" : "text-center"}`}>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">
                                {isCustomMode ? "Lock In Your Look." : step.title}
                            </h2>
                            <p className="text-sm opacity-70">
                                {isCustomMode ? "Jarvis has tailored this palette to your brand vibe. Ready to build?" : step.subtitle}
                            </p>
                        </div>

                        {step.type === "color-matrix" && !isCustomMode && (
                            <div className="flex gap-3">
                                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-300 hover:bg-gray-50"}`}>
                                    Generate Color <FiChevronDown />
                                </button>
                                <button
                                    onClick={handleCustomColorClick}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition ${isDark ? "border-white/10 hover:bg-white/5" : "border-gray-300 hover:bg-gray-50"}`}
                                >
                                    Custom Color <FiChevronsRight />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* CARDS */}
                    {step.type === "cards" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                            {step.options.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelected(i)}
                                    className={`
                                        rounded-2xl p-8 text-center cursor-pointer transition
                                        border
                                        ${selected === i
                                            ? isDark
                                                ? "border-white bg-white/10"
                                                : "border-black shadow-md"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    <div
                                        className={`
                                            w-14 h-14 mx-auto mb-5 rounded-full
                                            border flex items-center justify-center
                                            ${isDark ? "border-white/20" : "border-gray-400"}
                                        `}
                                    >
                                        <FiPhone />
                                    </div>
                                    <h3 className="font-medium mb-2">{item.title}</h3>
                                    <p className="text-sm opacity-70">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEARCH */}
                    {step.type === "search" && (
                        <>
                            <div
                                className={`
                                    mb-10 flex items-center gap-3 px-4 py-3 rounded-xl border
                                    ${isDark ? "border-white/10 bg-white/5" : "border-gray-300"}
                                `}
                            >
                                <FiSearch className="opacity-60" />
                                <input
                                    placeholder={step.placeholder}
                                    className="w-full outline-none text-sm bg-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                {step.options.map((item, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelected(i)}
                                        className={`
                                            rounded-2xl p-6 text-center cursor-pointer transition border
                                            ${selected === i
                                                ? isDark
                                                    ? "border-white bg-white/10"
                                                    : "border-black shadow-md"
                                                : isDark
                                                    ? "border-white/10 hover:bg-white/5"
                                                    : "border-gray-300 hover:bg-gray-50"
                                            }
                                        `}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* TEXTAREA */}
                    {step.type === "textarea" && (
                        <textarea
                            rows="6"
                            placeholder={step.placeholder}
                            className={`
                                w-full rounded-xl border px-5 py-4 mb-16 resize-none
                                bg-transparent outline-none
                                ${isDark ? "border-white/10" : "border-gray-300"}
                            `}
                        />
                    )}

                    {/* YES / NO */}
                    {step.type === "yesno" && (
                        <div className="flex justify-center gap-8 mb-16">
                            {["Yes", "No"].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setSelected(val)}
                                    className={`
                                        px-12 py-4 rounded-2xl text-lg font-medium transition border
                                        ${selected === val
                                            ? isDark
                                                ? "bg-white text-black border-white"
                                                : "bg-black text-white border-black"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ICON GRID */}
                    {step.type === "icon-grid" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {step.options.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelected(i)}
                                    className={`
                                        rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition border
                                        h-32
                                        ${selected === i
                                            ? isDark
                                                ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                                : "border-black shadow-md bg-gray-50"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    <div className="text-2xl mb-3 opacity-80">
                                        {item.icon}
                                    </div>
                                    <span className="font-medium text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* COLOR MATRIX */}
                    {step.type === "color-matrix" && !isCustomMode && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                            {step.options.map((palette, i) => (
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
                    )}

                    {/* MODULES SELECTION */}
                    {step.type === "modules-selection" && (
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
                                {step.options.map((option, i) => {
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
                    )}

                    {/* CUSTOM COLOR VIEW */}
                    {isCustomMode && (
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
                            <div className={`
                                w-full md:w-[340px] rounded-3xl p-6 flex flex-col gap-6 border
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
                    )}

                    {/* FOOTER */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm opacity-60">Previews</span>
                        <button
                            disabled={step.type !== "textarea" && selected === null}
                            onClick={nextStep}
                            className={`
                                px-10 py-2.5 rounded-full border transition
                                ${step.type === "textarea" || selected !== null
                                    ? isDark
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                    : "opacity-40 cursor-not-allowed border-gray-400"
                                }
                            `}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalStepModal;


