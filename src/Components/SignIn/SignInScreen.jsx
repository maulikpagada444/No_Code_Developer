import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaGoogle,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaLinkedin,
    FaRegUser,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";

const SignInScreen = ({ setStep, setEmail }) => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* ================= MANUAL LOGIN ================= */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    login_method: "manual",
                    email: formData.email,
                    password: formData.password,
                    device_id: "device-123",
                    device_name: "Web Browser",
                    location: "India",
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.status) {
                throw new Error(data?.message || "Login failed");
            }

            // ✅ SAVE COOKIES
            Cookies.set("access_token", data.data.access_token, { secure: true, sameSite: "Strict" });
            Cookies.set("refresh_token", data.data.refresh_token, { secure: true, sameSite: "Strict" });
            Cookies.set("user_id", data.data.user_id, { secure: true, sameSite: "Strict" });
            Cookies.set("email", data.data.email, { secure: true, sameSite: "Strict" });

            if (data.data.username) {
                Cookies.set("username", data.data.username, { secure: true, sameSite: "Strict" });
            }

            navigate("/");

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= GOOGLE LOGIN ================= */
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwt_decode(credentialResponse.credential);

            const response = await fetch(`${BASE_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: decoded.name,
                    email: decoded.email,
                    login_method: "google",
                    google_social_id: decoded.sub,
                    picture: decoded.picture,
                    device_id: "device-123",
                    device_name: "Chrome",
                    location: "India",
                }),
            });

            const data = await response.json();
            if (!response.ok || !data.status) {
                throw new Error(data.message || "Google login failed");
            }

            // ✅ SAVE COOKIES
            Cookies.set("access_token", data.data.access_token, { secure: true, sameSite: "Strict" });
            Cookies.set("refresh_token", data.data.refresh_token, { secure: true, sameSite: "Strict" });
            Cookies.set("user_id", data.data.user_id, { secure: true, sameSite: "Strict" });
            Cookies.set("email", data.data.email, { secure: true, sameSite: "Strict" });
            Cookies.set("username", data.data.username, { secure: true, sameSite: "Strict" });

            navigate("/");

        } catch (err) {
            alert(err.message);
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
                    left: '48%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    filter: 'blur(120px)',
                }}
            ></div>
            <div className="w-full max-w-8xl flex justify-center mx-auto grid grid-cols-1 lg:grid-cols-[520px_100px] gap-10 items-center">

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
                        Welcome Back
                    </h2>

                    <p
                        className={`text-sm text-center mt-2 mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }`}
                    >
                        Please enter your details to sign in
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username / Email */}
                        <Input
                            icon={<FaRegUser />}
                            name="email"
                            placeholder="Username or Email"
                            value={formData.email}
                            onChange={handleChange}
                            theme={theme}
                        />

                        {/* Password */}
                        <Input
                            icon={<MdLockOutline />}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your Password"
                            value={formData.password}
                            onChange={handleChange}
                            theme={theme}
                            rightIcon={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />

                        {/* Forgot password */}
                        <div className="text-right text-xs">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className={`hover:underline ${theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-500"
                                    }`}
                            >
                                Forgot Password?
                            </button>
                        </div>


                        {/* Sign In */}
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
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400">
                            <span className="flex-1 h-px bg-gray-300/50" />
                            Or Continue with
                            <span className="flex-1 h-px bg-gray-300/50" />
                        </div>

                        {/* Google */}
                        <button
                            type="button"
                            className={`
                        w-full flex items-center justify-center gap-3 py-3 rounded-xl transition
                        ${theme === "dark"
                                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }
                      `}
                        >
                            <FaGoogle className="text-red-500" />
                            Continue With Google
                        </button>

                        <p
                            className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}
                        >
                            Don’t have an account?
                            <Link
                                to="/signup"
                                className={`ml-1 font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                                    }`}
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>

                {/* SOCIAL */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xs tracking-widest font-semibold text-gray-500">
                        FOLLOW:-
                    </p>

                    {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin].map(
                        (Icon, i) => (
                            <button
                                key={i}
                                className={`
                          w-10 h-10 rounded-xl border flex items-center justify-center transition
                          ${theme === "dark"
                                        ? "bg-black border-gray-600 text-gray-300"
                                        : "bg-white border-gray-300 text-gray-600"
                                    }
                        `}
                            >
                                <Icon />
                            </button>
                        )
                    )}
                </div>

            </div>
        </div>
    );
};

const Input = ({ icon, rightIcon, theme, ...props }) => (
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
        {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
    </div>
);

export default SignInScreen;
