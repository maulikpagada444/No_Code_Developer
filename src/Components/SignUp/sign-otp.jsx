// import React, { useEffect, useRef, useState, useContext } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ThemeContext } from "../../ThemeProvider.jsx";

// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";
// import Cookies from "js-cookie";

// const OTP_LENGTH = 6;
// const OTP_TIMER = 20;

// const SignOtp = ({ email: propEmail }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { theme } = useContext(ThemeContext);

//     const email = location.state?.email || propEmail || "dummy@gmail.com";

//     const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
//     const inputRefs = useRef([]);
//     const [timer, setTimer] = useState(OTP_TIMER);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         inputRefs.current[0]?.focus();
//     }, []);

//     useEffect(() => {
//         if (timer <= 0) return;
//         const i = setInterval(() => setTimer((t) => t - 1), 1000);
//         return () => clearInterval(i);
//     }, [timer]);

//     const handleChange = (i, val) => {
//         if (!/^\d?$/.test(val)) return;

//         const next = [...otp];
//         next[i] = val;
//         setOtp(next);

//         if (val && i < OTP_LENGTH - 1) {
//             inputRefs.current[i + 1]?.focus();
//         }
//     };

//     /* ---------------- VERIFY OTP ---------------- */
//     const handleVerifyOtp = async () => {
//         const otpValue = otp.join("");

//         if (otpValue.length !== OTP_LENGTH) {
//             alert("Please enter complete OTP");
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         email: email,
//                         otp: otpValue,
//                     }),
//                 }
//             );

//             const payload = await response.json();

//             if (!response.ok || !payload.status) {
//                 alert(payload?.message || "OTP verification failed");
//                 setLoading(false);
//                 return;
//             }

//             // ✅ SAVE DATA IN COOKIES
//             Cookies.set("access_token", payload.data.access_token, {
//                 expires: 1, // 1 day
//                 secure: true,
//                 sameSite: "strict",
//             });

//             Cookies.set("refresh_token", payload.data.refresh_token, {
//                 expires: 7, // 7 days
//                 secure: true,
//                 sameSite: "strict",
//             });

//             Cookies.set("user_id", payload.data.user_id);
//             Cookies.set("email", payload.data.email);

//             // OPTIONAL (agar backend future me bheje)
//             if (payload.data.username) {
//                 Cookies.set("username", payload.data.username);
//             }

//             // ✅ REDIRECT
//             navigate("/dashboard");

//         } catch (error) {
//             console.error("OTP verify error:", error);
//             alert("Server not reachable");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <div
//             className="min-h-screen flex items-center justify-center px-4"
//             style={{
//                 backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
//                 backgroundColor: theme === "dark" ? "#000000" : "#f6f6f6",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             {/* Glow */}
//             <div
//                 className="absolute rounded-[100%] pointer-events-none z-0"
//                 style={{
//                     width: "990px",
//                     height: "562px",
//                     top: "-281px",
//                     left: "49%",
//                     transform: "translateX(-50%)",
//                     background: "rgba(255,255,255,0.15)",
//                     filter: "blur(120px)",
//                 }}
//             />

//             {/* CARD */}
//             <div
//                 className={`w-[92%] max-w-[620px] rounded-[28px] px-10 py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.08)]
//                 ${theme === "dark"
//                         ? "bg-[#111] border border-[#2a2a2a] text-white"
//                         : "bg-white border border-[#e2e2e2] text-[#222]"
//                     }`}
//             >
//                 <h1 className="text-2xl font-semibold mb-6">
//                     Verify Your Email
//                 </h1>

//                 <p className="text-sm font-medium mb-2">Enter Code</p>

//                 <p className={`text-xs mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
//                     We&apos;ve sent a code to {email}
//                 </p>

//                 {/* OTP Inputs */}
//                 <div className="flex justify-center gap-4 mb-4">
//                     {otp.map((v, i) => (
//                         <input
//                             key={i}
//                             ref={(el) => (inputRefs.current[i] = el)}
//                             value={v}
//                             maxLength={1}
//                             onChange={(e) => handleChange(i, e.target.value)}
//                             className={`w-12 h-12 text-center text-lg font-semibold rounded-md outline-none transition
//                             ${theme === "dark"
//                                     ? "bg-[#111] border border-[#444] text-white focus:border-white"
//                                     : "bg-white border border-[#ccc] text-[#333] focus:border-[#666]"
//                                 }`}
//                         />
//                     ))}
//                 </div>

//                 {/* Timer */}
//                 <p className={`text-xs mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
//                     Send Code Again 00:{String(timer).padStart(2, "0")}
//                 </p>

//                 {/* Verify Button */}
//                 <button
//                     onClick={handleVerifyOtp}
//                     disabled={loading}
//                     className={`w-full h-[48px] rounded-full font-semibold transition-all
//                     ${theme === "dark"
//                             ? "bg-white text-black hover:bg-gray-200"
//                             : "bg-white border border-[#ddd] hover:shadow-md"
//                         }
//                     ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
//                 >
//                     {loading ? "Verifying..." : "Verify"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SignOtp;



import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import Cookies from "js-cookie";

const OTP_LENGTH = 6;
const OTP_TIMER = 60;

const SignOtp = ({ email: propEmail }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);

    const email = location.state?.email || propEmail || "dummy@gmail.com";

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputRefs = useRef([]);
    const [timer, setTimer] = useState(OTP_TIMER);
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

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        const alertData = sessionStorage.getItem("signup_alert");

        if (alertData) {
            const parsed = JSON.parse(alertData);
            showAlert(parsed.message, parsed.severity);
            sessionStorage.removeItem("signup_alert");
        }
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

    /* ---------------- VERIFY OTP ---------------- */
    const handleVerifyOtp = async () => {
        const otpValue = otp.join("");

        if (otpValue.length !== OTP_LENGTH) {
            showAlert("Please enter the complete 6-digit OTP", "warning");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        otp: otpValue,
                    }),
                }
            );

            const payload = await response.json();

            if (!response.ok || !payload.status) {
                showAlert(
                    payload?.message || "OTP verification failed",
                    "error",
                    "Verification Failed"
                );
                return;
            }

            // ✅ SAVE COOKIES
            Cookies.set("access_token", payload.data.access_token, {
                expires: 1,
                secure: true,
                sameSite: "strict",
            });

            Cookies.set("refresh_token", payload.data.refresh_token, {
                expires: 7,
                secure: true,
                sameSite: "strict",
            });

            Cookies.set("user_id", payload.data.user_id);
            Cookies.set("email", payload.data.email);

            if (payload.data.username) {
                Cookies.set("username", payload.data.username);
            }

            showAlert(
                "OTP verified successfully. Welcome!",
                "success",
                "Verified"
            );

            setTimeout(() => {
                navigate("/dashboard", {
                    state: {
                        alert: {
                            message: `Welcome ${payload.data.username || ""}! Login successful.`,
                            severity: "success",
                        },
                    },
                });
            }, 800);

        } catch (error) {
            console.error("OTP verify error:", error);
            showAlert(
                "Server not reachable. Please try again.",
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

                {/* CARD */}
                <div
                    className={`w-[92%] max-w-[620px] rounded-[28px] px-10 py-12 text-center shadow-[0_40px_120px_rgba(0,0,0,0.08)]
                    ${theme === "dark"
                            ? "bg-[#111] border border-[#2a2a2a] text-white"
                            : "bg-white border border-[#e2e2e2] text-[#222]"
                        }`}
                >
                    <h1 className="text-2xl font-semibold mb-6">
                        Verify Your Email
                    </h1>

                    <p className="text-sm font-medium mb-2">Enter Code</p>

                    <p className={`text-xs mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        We&apos;ve sent a code to {email}
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-4 mb-4">
                        {otp.map((v, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                value={v}
                                maxLength={1}
                                onChange={(e) => handleChange(i, e.target.value)}
                                className={`w-12 h-12 text-center text-lg font-semibold rounded-md outline-none transition
                                ${theme === "dark"
                                        ? "bg-[#111] border border-[#444] text-white focus:border-white"
                                        : "bg-white border border-[#ccc] text-[#333] focus:border-[#666]"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <p className={`text-xs mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Send Code Again 00:{String(timer).padStart(2, "0")}
                    </p>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className={`w-full h-[48px] rounded-full font-semibold transition-all
                        flex items-center justify-center gap-2
                        ${theme === "dark"
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-white border border-[#ddd] hover:shadow-md"
                            }
                        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        )}
                        {loading ? "Verifying..." : "Verify"}
                    </button>
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

export default SignOtp;
