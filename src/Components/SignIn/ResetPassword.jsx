import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";

const ResetPassword = ({ setStep, email }) => {
    const { theme } = useContext(ThemeContext);

    const [form, setForm] = useState({
        password: "",
        confirm: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.password || !form.confirm) {
            setStatus({ type: "error", message: "Please fill both fields" });
            return;
        }

        if (form.password !== form.confirm) {
            setStatus({ type: "error", message: "Passwords do not match" });
            return;
        }

        setStatus({ type: "success", message: "Password reset successful" });

        setTimeout(() => {
            setStep(1); // back to sign in
        }, 800);
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
                        Reset Password
                    </h2>

                    <p
                        className={`text-sm text-center mt-2 mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Please choose a strong password you’ll remember
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* NEW PASSWORD */}
                        <Input
                            type={showPass ? "text" : "password"}
                            placeholder="New Password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            theme={theme}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />

                        {/* CONFIRM PASSWORD */}
                        <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={form.confirm}
                            onChange={(e) =>
                                setForm({ ...form, confirm: e.target.value })
                            }
                            theme={theme}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />

                        {/* STATUS */}
                        {status.message && (
                            <p
                                className={`text-sm text-center ${status.type === "error"
                                    ? "text-red-500"
                                    : "text-green-600"
                                    }`}
                            >
                                {status.message}
                            </p>
                        )}

                        {/* RESET BUTTON */}
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
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const Input = ({ rightIcon, theme, ...props }) => (
    <div
        className={`
      flex items-center gap-3 px-4 py-3 rounded-2xl border transition
      ${theme === "dark"
                ? "border-gray-600 focus-within:border-white"
                : "border-gray-300 focus-within:border-gray-500"
            }
    `}
    >
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
        {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
    </div>
);

export default ResetPassword;
