import React, { useContext, useState, useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const goals = [
    {
        title: "Get more calls",
        desc: "Optimize layout for direct contact and lead generation.",
    },
    {
        title: "Sell products",
        desc: "Optimize layout for direct contact and lead generation.",
    },
    {
        title: "Build brand presence",
        desc: "Optimize layout for direct contact and lead generation.",
    },
];

const GoalStepModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const [selected, setSelected] = useState(null);

    // 🔒 Lock scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{
                backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
                backgroundColor: theme === "dark" ? "#000000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* GRID OVERLAY */}
            <div
                className="
                    absolute inset-0 pointer-events-none
                    bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),
                    linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
                    bg-[size:40px_40px]
                "
            />

            {/* HEADER (NOW VISIBLE ✅) */}
            <Header />

            {/* CENTER CARD */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-6">
                <div
                    className="
                        w-full max-w-5xl
                        bg-white
                        rounded-[28px]
                        border border-gray-300
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        p-12
                    "
                >
                    {/* TOP BAR */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                        <span>INITIALIZING ENGINE......</span>
                        <span>STEP 01 / 06</span>
                    </div>

                    <div className="h-px bg-gray-300 mb-10" />

                    {/* TITLE */}
                    <div className="text-center mb-14">
                        <h2 className="text-2xl font-semibold mb-2">
                            What is your primary goal?
                        </h2>
                        <p className="text-sm text-gray-500">
                            Jarvis will restructure your site's DNA based on this selection.
                        </p>
                    </div>

                    {/* OPTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                        {goals.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`
                                    rounded-2xl border p-8 text-center cursor-pointer transition
                                    ${selected === i
                                        ? "border-black shadow-md"
                                        : "border-gray-300 hover:bg-gray-50"}
                                `}
                            >
                                <div
                                    className={`
                                        w-14 h-14 mx-auto mb-5
                                        rounded-full border flex items-center justify-center
                                        ${selected === i
                                            ? "border-black"
                                            : "border-gray-400"}
                                    `}
                                >
                                    <FiPhone />
                                </div>

                                <h3 className="font-medium mb-2">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Previews
                        </span>

                        <button
                            disabled={selected === null}
                            onClick={onClose}
                            className={`
                                px-10 py-2.5 rounded-full border transition
                                ${selected !== null
                                    ? "border-black text-black hover:bg-black hover:text-white"
                                    : "border-gray-300 text-gray-400 cursor-not-allowed"}
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
