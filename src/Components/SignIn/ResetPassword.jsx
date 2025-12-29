import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

const ResetPassword = ({ setStep, email }) => {
    const { theme } = useContext(ThemeContext);

    const [form, setForm] = useState({
        password: "",
        confirm: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    const showAlert = (message, severity = "error", title = "") => {
        setAlert({ open: true, message, severity, title });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.password || !form.confirm) {
            showAlert("Please fill both password fields", "warning");
            return;
        }

        if (form.password !== form.confirm) {
            showAlert("Passwords do not match", "error");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/reset-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        new_password: form.password,
                        confirm_password: form.confirm,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === false) {
                showAlert(
                    data?.message || "Failed to reset password",
                    "error",
                    "Reset Failed"
                );
                return;
            }

            showAlert(
                "Your password has been reset successfully",
                "success",
                "Password Updated"
            );

            setTimeout(() => {
                setStep(5);
            }, 1000);

        } catch (err) {
            console.error("Reset password error:", err);
            showAlert(
                "Server not reachable. Please try again later.",
                "error",
                "Network Error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center px-4"
                style={{
                    backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
                    backgroundColor: theme === "dark" ? "#000000" : "#f6f6f6",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Glow */}
                <div
                    className="absolute rounded-[100%] pointer-events-none z-0"
                    style={{
                        width: "990px",
                        height: "562px",
                        top: "-281px",
                        left: "49%",
                        transform: "translateX(-50%)",
                        background: "rgba(255,255,255,0.15)",
                        filter: "blur(120px)",
                    }}
                />

                <div className="w-full max-w-md">
                    <div
                        className={`rounded-[24px] px-10 py-12 border shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                        ${theme === "dark"
                                ? "bg-black border-gray-700 text-white"
                                : "bg-white border-gray-200 text-gray-900"
                            }`}
                    >
                        <h2 className="text-2xl font-semibold text-center">
                            Reset Password
                        </h2>

                        <p
                            className={`text-sm text-center mt-2 mb-8
                            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                        >
                            Please choose a strong password you’ll remember
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">

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

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-full border font-medium transition
                                flex items-center justify-center gap-2
                                ${theme === "dark"
                                        ? "bg-black border-white text-white hover:bg-white hover:text-black"
                                        : "bg-white border-gray-300 hover:shadow-md"
                                    }
                                ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                {loading && (
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                )}
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* 🔔 ALERT */}
            <AppAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                title={alert.title}
                onClose={() =>
                    setAlert(prev => ({ ...prev, open: false }))
                }
            />
        </>
    );
};

const Input = ({ rightIcon, theme, ...props }) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border
        ${theme === "dark"
                ? "border-gray-600 focus-within:border-white"
                : "border-gray-300 focus-within:border-gray-500"
            }`}
    >
        <input
            {...props}
            required
            className={`w-full text-sm bg-transparent outline-none
            ${theme === "dark"
                    ? "text-white placeholder-gray-500"
                    : "text-black placeholder-gray-400"
                }`}
        />
        {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
    </div>
);

export default ResetPassword;
