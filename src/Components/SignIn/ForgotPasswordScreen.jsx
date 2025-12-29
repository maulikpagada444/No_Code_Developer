import React, { useState, useContext } from "react";
import { FaRegEnvelope } from "react-icons/fa";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

const ForgotPasswordScreen = ({ setStep, setEmail }) => {
    const { theme } = useContext(ThemeContext);

    const [emailLocal, setEmailLocal] = useState("");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    const showAlert = (message, severity = "error", title = "") => {
        setAlert({
            open: true,
            message,
            severity,
            title,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailLocal.trim()) {
            showAlert("Please enter a valid email address", "warning");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password/send-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: emailLocal.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === false) {
                showAlert(data?.message || "Failed to send OTP", "error");
                return;
            }

            setEmail(emailLocal.trim());

            showAlert(
                "OTP sent successfully to your email",
                "success",
                "Check Your Inbox"
            );

            setTimeout(() => {
                setStep(3);
            }, 1200);

        } catch (err) {
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
                            Forgot Password?
                        </h2>

                        <p
                            className={`text-sm text-center mt-2 mb-8
                            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                        >
                            Enter the email associated with your account
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                icon={<FaRegEnvelope />}
                                type="email"
                                placeholder="Enter Your Email"
                                value={emailLocal}
                                onChange={(e) => setEmailLocal(e.target.value)}
                                theme={theme}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-full border font-medium transition flex items-center justify-center gap-2
    ${theme === "dark"
                                        ? "bg-black border-white text-white hover:bg-white hover:text-black"
                                        : "bg-white border-gray-300 hover:shadow-md"
                                    }
    ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                                {loading && (
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                )}
                                {loading ? "Sending..." : "Send Code"}
                            </button>


                            <p
                                className={`text-center text-sm
                                ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                            >
                                Remember your password?
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className={`ml-1 font-semibold hover:underline
                                    ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                                >
                                    Back to Sign In
                                </button>
                            </p>
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

const Input = ({ icon, theme, ...props }) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border
        ${theme === "dark"
                ? "border-gray-600 focus-within:border-white"
                : "border-gray-300 focus-within:border-gray-500"
            }`}
    >
        <span className="text-gray-400">{icon}</span>
        <input
            {...props}
            required
            className={`w-full text-sm bg-transparent outline-none
            ${theme === "dark"
                    ? "text-white placeholder-gray-500"
                    : "text-black placeholder-gray-400"
                }`}
        />
    </div>
);

export default ForgotPasswordScreen;
