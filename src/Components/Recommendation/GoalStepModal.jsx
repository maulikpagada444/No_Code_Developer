import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiSearch,
    FiPhone,
    FiShoppingCart,
    FiCpu,
    FiPenTool,
    FiActivity,
    FiBriefcase,
    FiCoffee,
    FiChevronDown,
    FiChevronsRight,
} from "react-icons/fi";
import Header from "./Header.jsx";
import { ThemeContext } from "../../ThemeProvider.jsx";
import ColorSelection, { COLOR_MATRIX_OPTIONS, MODULES_OPTIONS } from "./ColorSelection.jsx";

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
        options: COLOR_MATRIX_OPTIONS
    },
    {
        type: "modules-selection",
        title: "Select Core Modules",
        subtitle: "Choose up to 4 features. Jarvis will architect the neural pathways for the rest.",
        options: MODULES_OPTIONS
    }
];

/* ---------------- COMPONENT ---------------- */

const GoalStepModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const navigate = useNavigate();

    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [textAnswer, setTextAnswer] = useState("");
    const [loading, setLoading] = useState(false);

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
            setSelected(null); // Reset selection
            setTextAnswer(""); // Reset text
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
            <Header />

            {/* GRID */}
            <div
                className="absolute inset-0 pointer-events-none
                bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),
                linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
                bg-[size:40px_40px]"
            />

            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
                <div
                    className={`w-full max-w-5xl rounded-[28px] p-12 border backdrop-blur-xl
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        ${isDark
                            ? "bg-black/70 border-white/10 text-white"
                            : "bg-white border-gray-300 text-black"
                        }`}
                >
                    {/* TOP */}
                    <div className="flex justify-between text-xs mb-6 opacity-70">
                        <span>INITIALIZING ENGINE......</span>
                        <span>STEP {String(stepIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
                    </div>

                    {/* TITLE */}
                    <div className={`${step.type === "color-matrix" ? "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left" : "text-center mb-12"}`}>
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

                    {/* CONTENT RENDERERS */}

                    {/* CARDS (Step 0) */}
                    {step.type === "cards" && step.options && (
                        <div className="grid md:grid-cols-3 gap-10 mb-16">
                            {step.options.map((opt, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelected(opt.title)}
                                    className={`rounded-2xl p-8 text-left cursor-pointer border transition flex flex-col h-full
                                        ${selected === opt.title
                                            ? isDark
                                                ? "border-white bg-white/10"
                                                : "border-black shadow-md"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <h3 className="font-medium text-lg mb-2">{opt.title}</h3>
                                    <p className="text-sm opacity-60">{opt.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* SEARCH (Step 1) */}
                    {step.type === "search" && step.options && (
                        <div className="grid md:grid-cols-3 gap-6 mb-16">
                            {step.options.map((opt, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelected(opt)}
                                    className={`rounded-2xl p-6 text-center cursor-pointer border transition
                                        ${selected === opt
                                            ? isDark
                                                ? "border-white bg-white/10"
                                                : "border-black shadow-md"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    <h3 className="font-medium">
                                        {opt}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* TEXT INPUT */}
                    {step.type === "textarea" && (
                        <textarea
                            rows="6"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            placeholder={step.placeholder || "Type your answer here..."}
                            className={`w-full rounded-xl border px-5 py-4 mb-16 resize-none bg-transparent outline-none
                                ${isDark ? "border-white/10" : "border-gray-300"}`}
                        />
                    )}

                    {/* YES / NO */}
                    {step.type === "yesno" && (
                        <div className="flex justify-center gap-8 mb-16">
                            {["Yes", "No"].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setSelected(val)}
                                    className={`px-12 py-4 rounded-2xl text-lg font-medium border transition
                                        ${selected === val
                                            ? isDark
                                                ? "bg-white text-black border-white"
                                                : "bg-black text-white border-black"
                                            : isDark
                                                ? "border-white/10 hover:bg-white/5"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
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

                    {/* COLOR MATRIX & MODULES SELECTION via ColorSelection Component */}
                    {(step.type === "color-matrix" || step.type === "modules-selection") && (
                        <ColorSelection
                            stepType={step.type}
                            options={step.options}
                            isDark={isDark}
                            selected={selected}
                            setSelected={setSelected}
                            // Custom Color Props
                            isCustomMode={isCustomMode}
                            customPalette={customPalette}
                            activeColorIndex={activeColorIndex}
                            currentColor={currentColor}
                            setActiveColorIndex={setActiveColorIndex}
                            setCurrentColor={setCurrentColor}
                            handleColorChange={handleColorChange}
                            handleSaveCustom={handleSaveCustom}
                        />
                    )}

                    {/* FOOTER */}
                    <div className="flex justify-end">
                        <button
                            disabled={
                                loading ||
                                (step.type === "textarea" && !textAnswer) ||
                                (step.type !== "textarea" && !isCustomMode && selected === null)
                            }
                            onClick={nextStep}
                            className={`px-10 py-2.5 rounded-full border transition
                                ${(selected !== null || textAnswer || (isCustomMode))
                                    ? isDark
                                        ? "border-white hover:bg-white hover:text-black"
                                        : "border-black hover:bg-black hover:text-white"
                                    : "opacity-40 cursor-not-allowed border-gray-400"
                                }`}
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalStepModal;