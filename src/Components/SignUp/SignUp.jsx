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
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import { ThemeContext } from "../../ThemeProvider.jsx";

const SignUp = ({ setStep, setEmail }) => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /* ---------------- MANUAL SIGNUP ---------------- */
    const handleManualSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                        confirm_password: formData.confirm_password,
                        login_method: "manual",
                        device_id: "device-123",
                        device_name: "Web Browser",
                        location: "Surat",
                    }),
                }
            );

            if (!response.ok) {
                alert("Signup failed");
                return;
            }

            await response.json();

            // ✅ GO TO STEP 2
            setEmail(formData.email);
            setStep(2);

        } catch (err) {
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };
    /* ---------------- GOOGLE SIGNUP ---------------- */
    const handleGoogleSignup = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "john_doe",
                        email: "anantapokiya114@gmail.com",
                        login_method: "google",
                        social_id: "123456789",
                        picture: "https://example.com/profile.jpg",
                        device_id: "device-123",
                        device_name: "Web Browser",
                        location: "India",
                    }),
                }
            );

            if (!response.ok) {
                const text = await response.text();
                console.error("Google signup error:", response.status, text);
                alert("Google signup failed");
                return;
            }

            const data = await response.json();
            console.log("Google signup success:", data);

            navigate("/dashboard");

        } catch (error) {
            console.error("Google API error:", error);
            alert("Server not reachable");
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
            {/* Glow */}
            <div
                className="absolute rounded-[100%] pointer-events-none z-0"
                style={{
                    width: "990px",
                    height: "562px",
                    top: "-281px",
                    left: "48%",
                    transform: "translateX(-50%)",
                    background: "rgba(255,255,255,0.15)",
                    filter: "blur(120px)",
                }}
            />

            <div className="w-full max-w-8xl flex justify-center mx-auto grid grid-cols-1 lg:grid-cols-[520px_100px] gap-10 items-center">

                {/* CARD */}
                <div
                    className={`rounded-[24px] px-10 py-12 border shadow-[0_30px_80px_rgba(0,0,0,0.08)]
                    ${theme === "dark"
                            ? "bg-black border-gray-700 text-white"
                            : "bg-white border-gray-200 text-gray-900"
                        }`}
                >
                    <h2 className="text-2xl font-semibold text-center">
                        Create An Account
                    </h2>

                    <p className={`text-sm text-center mt-2 mb-8
                        ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Kindly fill in your details below to create an account
                    </p>

                    <form className="space-y-5" onSubmit={handleManualSignup}>
                        <Input
                            icon={<FaRegUser />}
                            placeholder="Enter Your Username"
                            theme={theme}
                            name="username"
                            onChange={handleChange}
                        />

                        <Input
                            icon={<HiOutlineMail />}
                            type="email"
                            placeholder="Enter Your Email"
                            theme={theme}
                            name="email"
                            onChange={handleChange}
                        />

                        <Input
                            icon={<MdLockOutline />}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Your Password"
                            theme={theme}
                            name="password"
                            onChange={handleChange}
                            rightIcon={
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />

                        <Input
                            icon={<MdLockOutline />}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Enter Your Confirm Password"
                            theme={theme}
                            name="confirm_password"
                            onChange={handleChange}
                            rightIcon={
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            }
                        />

                        <label className={`flex gap-2 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            <input type="checkbox" required />
                            I Agree To The Terms And Conditions And Neural Privacy Policy
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-full border font-medium transition
                            ${theme === "dark"
                                    ? "bg-black border-white text-white hover:bg-white hover:text-black"
                                    : "bg-white border-gray-300 hover:shadow-md"
                                }
                            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>

                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400">
                            <span className="flex-1 h-px bg-gray-300/50" />
                            Or Continue with
                            <span className="flex-1 h-px bg-gray-300/50" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl transition
                            ${theme === "dark"
                                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <FaGoogle className="text-red-500" />
                            Continue With Google
                        </button>

                        <p className={`text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            Already have an account?
                            <Link to="/signin" className={`ml-1 font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>

                {/* SOCIAL */}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-xs tracking-widest font-semibold text-gray-500">FOLLOW:-</p>
                    {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin].map((Icon, i) => (
                        <button
                            key={i}
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition
                            ${theme === "dark"
                                    ? "bg-black border-gray-600 text-gray-300"
                                    : "bg-white border-gray-300 text-gray-600"
                                }`}
                        >
                            <Icon />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Input = ({ icon, rightIcon, theme, ...props }) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition
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
        {rightIcon && <span className="text-gray-400">{rightIcon}</span>}
    </div>
);

export default SignUp;
