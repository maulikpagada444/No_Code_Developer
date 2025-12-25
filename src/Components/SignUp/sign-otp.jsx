import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeProvider.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const OTP_LENGTH = 4;
const OTP_TIMER = 20;

const SignOtp = ({ email = "dummy@gmail.com" }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(OTP_TIMER);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer <= 0) return;
        const i = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(i);
    }, [timer]);

    const handleChange = (i, val) => {
        if (!/^\d?$/.test(val)) return;

        const next = [...otp];
        next[i] = val;
        setOtp(next);

        if (val && i < OTP_LENGTH - 1) {
            inputRefs.current[i + 1]?.focus();
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
                backgroundColor: theme === "dark" ? "#000000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* CARD */}
            <div
                className={`
          w-[92%] max-w-[620px]
          rounded-[28px]
          px-10 py-12
          text-center
          shadow-[0_40px_120px_rgba(0,0,0,0.08)]
          ${theme === "dark"
                        ? "bg-[#111] border border-[#2a2a2a] text-white"
                        : "bg-white border border-[#e2e2e2] text-[#222]"
                    }
        `}
            >
                <h1 className="text-2xl font-semibold mb-6">
                    Verify Your Email
                </h1>

                <p className="text-sm font-medium mb-2">
                    Enter Code
                </p>

                <p
                    className={`text-xs mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    We&apos;ve sent a code to {email}
                </p>

                {/* OTP BOXES */}
                <div className="flex justify-center gap-4 mb-4">
                    {otp.map((v, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            value={v}
                            maxLength={1}
                            onChange={(e) => handleChange(i, e.target.value)}
                            className={`
                w-12 h-12
                text-center text-lg font-semibold
                rounded-md
                outline-none
                transition
                ${theme === "dark"
                                    ? "bg-[#111] border border-[#444] text-white focus:border-white"
                                    : "bg-white border border-[#ccc] text-[#333] focus:border-[#666]"
                                }
              `}
                        />
                    ))}
                </div>

                {/* TIMER */}
                <p
                    className={`text-xs mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    Send Code Again 00:{String(timer).padStart(2, "0")}
                </p>

                {/* VERIFY BUTTON */}
                <button
                    onClick={() => navigate("/web-builder/dashboard")}
                    className={`
            w-full h-[48px]
            rounded-full
            font-semibold
            transition-all
            ${theme === "dark"
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-white border border-[#ddd] hover:shadow-md"
                        }
          `}
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default SignOtp;
