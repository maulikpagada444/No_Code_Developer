import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NewProjectModal = ({ onClose }) => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            setError("Project name is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const accessToken = Cookies.get("access_token");

            const response = await fetch(`${BASE_URL}/auth/project/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    project_name: projectName.trim(),
                }),
            });

            const data = await response.json();

            if (!response.ok || data.status !== true) {
                throw new Error(data?.message || "Project creation failed");
            }

            // ✅ SAVE PROJECT ID FROM API RESPONSE
            Cookies.set("project_id", data.data.project_id, {
                secure: true,
                sameSite: "Strict",
            });

            // ✅ REDIRECT TO WORKSPACE
            navigate("/project/workspace");

        } catch (error) {
            console.error("Create project error:", error);
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className={`
                    absolute inset-0
                    ${theme === "dark"
                        ? "bg-black/50 backdrop-blur-md"
                        : "bg-black/30 backdrop-blur-sm"
                    }
                `}
                onClick={onClose}
            />

            {/* MODAL */}
            <div
                className={`
                    relative z-10 w-full max-w-md p-8
                    rounded-3xl border backdrop-blur-xl
                    ${theme === "dark"
                        ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 text-white shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                        : "bg-white border-gray-200 text-black shadow-xl"
                    }
                `}
            >
                <h2 className="text-2xl font-semibold text-center mb-8">
                    Project Details
                </h2>

                {/* INPUT */}
                <div className="mb-4">
                    <label
                        className={`text-sm mb-2 block ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Project Name
                    </label>

                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter Project Name"
                        className={`
                            w-full px-4 py-3 rounded-xl outline-none text-sm border
                            ${theme === "dark"
                                ? "bg-white/5 border-white/10 text-white placeholder-gray-500"
                                : "bg-gray-50 border-gray-300 text-black placeholder-gray-400"
                            }
                        `}
                    />
                </div>

                {/* ERROR */}
                {error && (
                    <p className="text-sm text-red-500 mb-4 text-center">
                        {error}
                    </p>
                )}

                {/* BUTTON */}
                <button
                    onClick={handleCreateProject}
                    disabled={loading}
                    className={`
                        w-full py-3 rounded-full font-medium transition
                        ${theme === "dark"
                            ? "bg-white/10 border border-white/20 hover:bg-white/20"
                            : "bg-black text-white hover:bg-black/90"
                        }
                        ${loading ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                >
                    {loading ? "Creating..." : "Continue"}
                </button>
            </div>
        </div>
    );
};

export default NewProjectModal;
