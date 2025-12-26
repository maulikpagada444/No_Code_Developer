import React, { useContext, useState } from "react";
import { FiPhone, FiSearch } from "react-icons/fi";
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
];

/* ---------------- COMPONENT ---------------- */

const GoalStepModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [stepIndex, setStepIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    const step = steps[stepIndex];

    const nextStep = () => {
        if (stepIndex < steps.length - 1) {
            setSelected(null);
            setStepIndex(stepIndex + 1);
        } else {
            onClose();
        }
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
                        <span>STEP {String(stepIndex + 1).padStart(2, "0")} / 06</span>
                    </div>

                    <div className={`h-px mb-10 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />

                    {/* TITLE */}
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold mb-2">
                            {step.title}
                        </h2>
                        <p className="text-sm opacity-70">
                            {step.subtitle}
                        </p>
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
