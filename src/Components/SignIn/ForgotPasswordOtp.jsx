import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const OTP_LENGTH = 6;
const OTP_TIMER = 30;

const ForgotPasswordOtp = ({ setStep, email }) => {
    const { theme } = useContext(ThemeContext);

    const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);

    const [timer, setTimer] = useState(OTP_TIMER);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer <= 0) return;
        const i = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(i);
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const next = [...otpValues];
        next[index] = value;
        setOtpValues(next);

        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (otpValues.includes("")) {
            setError("Please enter complete code");
            return;
        }

        const otp = otpValues.join("");

        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/verify-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        otp: otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === false) {
                setError(data?.message || "Invalid or expired OTP");
                setIsSubmitting(false);
                return;
            }

            // ✅ OTP VERIFIED → GO TO RESET PASSWORD
            setStep(4);

        } catch (err) {
            console.error("Verify OTP error:", err);
            setError("Server not reachable");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/send-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );
            setOtpValues(Array(OTP_LENGTH).fill(""));
            setTimer(OTP_TIMER);
        } catch {
            setError("Failed to resend OTP");
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
            {/* --- GLOW EFFECT --- */}
            <div
                className="absolute rounded-[100%] pointer-events-none z-0"
                style={{
                    width: '990px',
                    height: '562px',
                    top: '-281px',
                    left: '49%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    filter: 'blur(120px)',
                }}
            ></div>
            <div className="w-full max-w-md">
                {/* CARD */}
                <div
                    className={`
            rounded-[24px] px-10 py-12 border shadow-[0_30px_80px_rgba(0,0,0,0.08)]
            ${theme === "dark"
                            ? "bg-black border-gray-700 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }
          `}
                >
                    <h2 className="text-2xl font-semibold text-center">
                        Verify Your Email
                    </h2>

                    <p
                        className={`text-sm text-center mt-2 mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        We&apos;ve sent a 6-digit code to
                        <span
                            className={`block font-medium mt-1 ${theme === "dark" ? "text-white" : "text-gray-800"
                                }`}
                        >
                            {email}
                        </span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP INPUTS */}
                        <div className="flex justify-center gap-3">
                            {otpValues.map((value, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    className={`
                    w-12 h-12
                    text-center text-lg font-semibold
                    rounded-xl
                    outline-none transition
                    ${theme === "dark"
                                            ? "bg-black border border-gray-600 text-white focus:border-white"
                                            : "bg-white border border-gray-300 text-black focus:border-gray-500"
                                        }
                  `}
                                />
                            ))}
                        </div>

                        {/* ERROR */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* TIMER */}
                        <p
                            className={`text-xs text-center ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            {timer > 0 ? (
                                <>Send code again in 00:{String(timer).padStart(2, "0")}</>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    Resend Code
                                </button>
                            )}
                        </p>

                        {/* VERIFY BUTTON */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                w-full py-3 rounded-full border font-medium transition
                ${theme === "dark"
                                    ? "bg-black border-white text-white hover:bg-white hover:text-black"
                                    : "bg-white border-gray-300 hover:shadow-md"
                                }
                disabled:opacity-50
              `}
                        >
                            {isSubmitting ? "Verifying..." : "Verify"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordOtp;
