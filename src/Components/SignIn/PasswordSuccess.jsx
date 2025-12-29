import React, { useContext, useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

const PasswordSuccess = ({ setStep }) => {
    const { theme } = useContext(ThemeContext);
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    // 🔔 Show success alert once
    useEffect(() => {
        setAlert({
            open: true,
            message: "Your password has been changed successfully.",
            severity: "success",
            title: "Success",
        });
    }, []);

    const handleBackToSignIn = () => {
        setLoading(true);
        setTimeout(() => {
            setStep(1);
        }, 800);
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
                        {/* ICON */}
                        <div className="flex justify-center mb-6">
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center
                                ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
                            >
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center
                                    ${theme === "dark" ? "bg-white" : "bg-black"}`}
                                >
                                    <IoCheckmark
                                        size={28}
                                        className={theme === "dark" ? "text-black" : "text-white"}
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-semibold text-center mb-2">
                            Successful
                        </h2>

                        <p
                            className={`text-sm text-center mb-8
                            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                        >
                            Congratulations! Your password has been changed.
                        </p>

                        {/* BUTTON */}
                        <button
                            onClick={handleBackToSignIn}
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
                            {loading ? "Redirecting..." : "Back to Sign In"}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔔 SUCCESS ALERT */}
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

export default PasswordSuccess;
