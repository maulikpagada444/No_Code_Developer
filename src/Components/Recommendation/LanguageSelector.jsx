import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { HiOutlineTranslate } from "react-icons/hi";

const languages = [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Gujarati", value: "gujarati" },
];

const LanguageSelector = ({ theme, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selectedLanguage =
        languages.find((l) => l.value === value) || languages[0];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-[260px]">
            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className={`
                    w-full flex items-center justify-between
                    px-5 py-3 rounded-full text-sm
                    border backdrop-blur-xl
                    ${theme === "dark"
                        ? "bg-black/60 border-white/10 text-white"
                        : "bg-white border-gray-300 text-black"}
                `}
            >
                <div className="flex items-center gap-3">
                    <HiOutlineTranslate size={18} />
                    <span className="font-medium">
                        {selectedLanguage.label}
                    </span>
                </div>

                {open ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className={`
                        absolute top-[60px] left-0 w-full
                        rounded-2xl border overflow-hidden
                        ${theme === "dark"
                            ? "bg-black/80 border-white/10 text-white"
                            : "bg-white border-gray-200 text-black"}
                    `}
                >
                    <div className="max-h-[260px] overflow-y-auto py-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.value}
                                onClick={() => {
                                    onChange(lang.value);
                                    setOpen(false);
                                }}
                                className={`
                                    w-full flex items-center gap-4
                                    px-6 py-3 text-sm transition
                                    ${theme === "dark"
                                        ? "hover:bg-white/10"
                                        : "hover:bg-gray-100"}
                                `}
                            >
                                {/* RADIO */}
                                <span
                                    className={`
                                        w-4 h-4 rounded-full border flex items-center justify-center
                                        ${value === lang.value
                                            ? "border-white"
                                            : "border-gray-500"}
                                    `}
                                >
                                    {value === lang.value && (
                                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                                    )}
                                </span>

                                <span className="font-medium">
                                    {lang.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
