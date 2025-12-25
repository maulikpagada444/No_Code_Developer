import React, { useState, useContext } from "react";
import { FaRegEnvelope } from "react-icons/fa";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";

const ForgotPasswordScreen = ({ setStep, setEmail }) => {
    const { theme } = useContext(ThemeContext);
    const [emailLocal, setEmailLocal] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailLocal.trim()) {
            setError("Please enter a valid email");
            return;
        }
        setError("");
        setEmail(emailLocal.trim());
        setStep(3); // OTP step
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
                        Forgot Password?
                    </h2>

                    <p
                        className={`text-sm text-center mt-2 mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Enter the email associated with your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* EMAIL */}
                        <Input
                            icon={<FaRegEnvelope />}
                            type="email"
                            placeholder="Enter Your Email"
                            value={emailLocal}
                            onChange={(e) => setEmailLocal(e.target.value)}
                            theme={theme}
                        />

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* SEND CODE */}
                        <button
                            type="submit"
                            className={`
                w-full py-3 rounded-full border font-medium transition
                ${theme === "dark"
                                    ? "bg-black border-white text-white hover:bg-white hover:text-black"
                                    : "bg-white border-gray-300 hover:shadow-md"
                                }
              `}
                        >
                            Send Code
                        </button>

                        {/* BACK TO SIGN IN */}
                        <p
                            className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Remember your password?
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className={`ml-1 font-semibold hover:underline ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Back to Sign In
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Input = ({ icon, theme, ...props }) => (
    <div
        className={`
      flex items-center gap-3 px-4 py-3 rounded-2xl border transition
      ${theme === "dark"
                ? "border-gray-600 focus-within:border-white"
                : "border-gray-300 focus-within:border-gray-500"
            }
    `}
    >
        <span className="text-gray-400">{icon}</span>
        <input
            {...props}
            required
            className={`
        w-full text-sm bg-transparent outline-none
        ${theme === "dark"
                    ? "text-white placeholder-gray-500"
                    : "text-black placeholder-gray-400"
                }
      `}
        />
    </div>
);

export default ForgotPasswordScreen;
