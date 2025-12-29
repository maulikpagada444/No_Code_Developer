import React, { useContext, useState } from "react";
import { FiLock } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import { ThemeContext } from "../../ThemeProvider.jsx";
import AppAlert from "../common/AppAlert.jsx";

const SettingSecurity = () => {
    const { theme } = useContext(ThemeContext);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [form, setForm] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [show, setShow] = useState({
        old: false,
        new: false,
        confirm: false,
    });

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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* 🔐 CHANGE PASSWORD */
    const handleSave = async () => {
        if (!form.old_password || !form.new_password || !form.confirm_password) {
            showAlert("All fields are required", "warning");
            return;
        }

        if (form.new_password !== form.confirm_password) {
            showAlert("New passwords do not match", "warning");
            return;
        }

        try {
            setLoading(true);

            const token = Cookies.get("access_token");

            const response = await fetch(`${BASE_URL}/auth/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    old_password: form.old_password,
                    new_password: form.new_password,
                    confirm_password: form.confirm_password,
                }),
            });

            const data = await response.json();

            if (!response.ok || data.status === false) {
                showAlert(
                    data?.message || "Failed to change password",
                    "error",
                    "Update Failed"
                );
                return;
            }

            showAlert(
                "Password updated successfully",
                "success",
                "Security Updated"
            );

            setForm({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });

        } catch (error) {
            console.error(error);
            showAlert(
                "Server not reachable. Try again later.",
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
                className={`
                rounded-3xl p-10 border backdrop-blur-xl
                ${theme === "dark"
                        ? "bg-white/5 border-white/10 text-white"
                        : "bg-white border-gray-200 text-black"
                    }
            `}
            >
                <h2 className="text-lg font-semibold mb-1">
                    Account Security
                </h2>

                <p className={`text-sm mb-10 ${theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
                    }`}>
                    Update your password to keep your account secure
                </p>

                <div className="space-y-6">

                    <PasswordInput
                        label="Current Password"
                        name="old_password"
                        value={form.old_password}
                        onChange={handleChange}
                        theme={theme}
                        show={show.old}
                        onToggle={() =>
                            setShow(prev => ({ ...prev, old: !prev.old }))
                        }
                    />

                    <PasswordInput
                        label="New Password"
                        name="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                        theme={theme}
                        show={show.new}
                        onToggle={() =>
                            setShow(prev => ({ ...prev, new: !prev.new }))
                        }
                    />

                    <PasswordInput
                        label="Confirm New Password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        theme={theme}
                        show={show.confirm}
                        onToggle={() =>
                            setShow(prev => ({ ...prev, confirm: !prev.confirm }))
                        }
                    />

                    {/* Save Button */}
                    <div className="flex justify-end pt-6">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`
                            px-6 py-3 rounded-full font-medium flex items-center gap-2 transition border
                            ${theme === "dark"
                                    ? "bg-white/5 border-white/20 hover:bg-white/10"
                                    : "border-gray-300 hover:bg-gray-100"
                                }
                            ${loading ? "opacity-60 cursor-not-allowed" : ""}
                        `}
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            )}
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
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

const PasswordInput = ({
    label,
    theme,
    show,
    onToggle,
    ...props
}) => (
    <div>
        <label className="block text-sm mb-2">
            {label}
        </label>
        <div
            className={`
                flex items-center px-4 py-3 rounded-lg border
                ${theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "border-gray-300"
                }
            `}
        >
            <FiLock className="mr-3 text-gray-400" />

            <input
                type={show ? "text" : "password"}
                {...props}
                className={`
                    w-full outline-none text-sm bg-transparent
                    ${theme === "dark"
                        ? "text-white placeholder-gray-500"
                        : "text-black placeholder-gray-400"
                    }
                `}
            />

            <button
                type="button"
                onClick={onToggle}
                className="ml-2 text-gray-400 hover:text-gray-600"
            >
                {show ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    </div>
);

export default SettingSecurity;
