import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { FiPlus, FiEdit2, FiFolder, FiMic } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import NewProjectModal from "../Recommendation/NewProjectModal.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AppAlert from "../common/AppAlert.jsx";

/* Reusable Glass Card */
const GlassCard = ({ theme, className = "", children, ...props }) => (
    <div
        {...props}
        className={`
            rounded-3xl border backdrop-blur-xl
            ${theme === "dark"
                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)]"
                : "bg-white border-gray-200"
            }
            ${className}
        `}
    >
        {children}
    </div>
);

const Dashboard = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [openNewProject, setOpenNewProject] = useState(false);
    const [recentProjects, setRecentProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    const [editProject, setEditProject] = useState(null);
    const [newProjectName, setNewProjectName] = useState("");
    const [updating, setUpdating] = useState(false);

    /* 🔔 ALERT */
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showAlert = (message, severity = "success") => {
        setAlert({ open: true, message, severity });
    };

    /* 🔐 Extract projects safely */
    const extractProjects = (data) => {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.projects)) return data.projects;
        if (Array.isArray(data?.data?.projects)) return data.data.projects;
        if (Array.isArray(data?.data)) return data.data;
        if (Array.isArray(data?.results)) return data.results;
        if (Array.isArray(data?.projects?.results)) return data.projects.results;
        return [];
    };

    /* 🔔 Alert from navigation */
    useEffect(() => {
        if (location.state?.alert) {
            setAlert({
                open: true,
                message: location.state.alert.message,
                severity: location.state.alert.severity,
            });
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    /* 📡 Fetch projects */
    useEffect(() => {
        const fetchRecentProjects = async () => {
            try {
                const token = Cookies.get("access_token");

                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/project/list`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = await res.json();
                const projects = extractProjects(data);
                setRecentProjects(projects.slice(0, 4));
            } catch (err) {
                setRecentProjects([]);
            } finally {
                setLoadingProjects(false);
            }
        };

        fetchRecentProjects();
    }, []);

    /* ✏️ UPDATE PROJECT NAME */
    const handleUpdateProjectName = async () => {
        if (!newProjectName.trim()) {
            showAlert("Project name cannot be empty", "warning");
            return;
        }

        try {
            setUpdating(true);
            const token = Cookies.get("access_token");

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/project/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        project_id: editProject.project_id,
                        new_project_name: newProjectName.trim(),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok || data?.status !== true) {
                showAlert(data?.message || "Update failed", "error");
                return;
            }

            // ✅ Update UI
            setRecentProjects((prev) =>
                prev.map((p) =>
                    p.project_id === editProject.project_id
                        ? { ...p, project_name: newProjectName }
                        : p
                )
            );

            showAlert("Project renamed successfully", "success");
            setEditProject(null);

        } catch (err) {
            showAlert("Something went wrong", "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <>
            <div
                className={`
                min-h-screen relative overflow-hidden
                ${theme === "dark"
                        ? "bg-[#0b0b0b] text-white"
                        : "bg-[#fafafa] text-black"
                    }
            `}
            >
                {theme === "dark" && (
                    <div className="absolute inset-0 z-0 pointer-events-none
                        bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                        linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                        bg-[size:40px_40px]" />
                )}

                <Header />

                <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-semibold mb-12">
                        Welcome Back, Demo
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* NEW PROJECT */}
                        <GlassCard
                            theme={theme}
                            className="p-6 h-[260px] cursor-pointer hover:bg-white/10 transition"
                            onClick={() => setOpenNewProject(true)}
                        >
                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4
                                ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}>
                                <FiPlus size={20} />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">New Project</h2>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </GlassCard>

                        {/* RECENT PROJECT */}
                        <GlassCard theme={theme} className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`
                                        w-10 h-10 rounded-lg flex items-center justify-center
                                        ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
                                    `}
                                    >
                                        <FiFolder />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            Recent Project
                                        </h2>
                                        <p
                                            className={`text-sm ${theme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                                }`}
                                        >
                                            Resume work on existing builds.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className={`
                                    px-4 py-1.5 rounded-lg text-sm transition border
                                    ${theme === "dark"
                                            ? "bg-white/5 border-white/10 hover:bg-white/10"
                                            : "bg-white border-gray-300 hover:bg-gray-100"
                                        }
                                `}
                                    onClick={() => navigate("/dashboard/project")}
                                >
                                    View All →
                                </button>
                            </div>

                            <div className="space-y-4">
                                {loadingProjects ? (
                                    <p className="text-sm opacity-60">
                                        Loading projects...
                                    </p>
                                ) : recentProjects.length === 0 ? (
                                    <p className="text-sm opacity-60">
                                        No recent projects found
                                    </p>
                                ) : (
                                    recentProjects.map((project, i) => (
                                        <div
                                            key={project.project_id || project.id || i}
                                            className={`
                                            flex items-center justify-between
                                            px-6 py-4 rounded-full border transition
                                            ${theme === "dark"
                                                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                                                    : "bg-white border-gray-200 hover:bg-gray-50"
                                                }
                                        `}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`
                                                    w-9 h-9 rounded-full flex items-center justify-center
                                                    ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
                                                `}
                                                >
                                                    <FiFolder />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {project.project_name ||
                                                            project.name ||
                                                            project.title ||
                                                            "Untitled Project"}
                                                    </p>
                                                </div>
                                            </div>

                                            <FiEdit2
                                                onClick={() => {
                                                    setEditProject(project);
                                                    setNewProjectName(project.project_name || "");
                                                }}

                                                className={`
                                                cursor-pointer
                                                ${theme === "dark"
                                                        ? "text-gray-400 hover:text-white"
                                                        : "text-gray-500 hover:text-black"
                                                    }
                                            `}
                                            />

                                        </div>
                                    ))
                                )}
                            </div>
                        </GlassCard>
                    </div>
                </main>

                {openNewProject && (
                    <NewProjectModal onClose={() => setOpenNewProject(false)} />
                )}

                {/* MIC */}
                <div className="fixed bottom-10 left-10 z-20 flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full border backdrop-blur flex items-center justify-center
                        ${theme === "dark"
                            ? "bg-white/10 border-white/20 text-gray-300"
                            : "bg-white border-gray-300 text-gray-600"
                        }`}>
                        <FiMic />
                    </div>
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Type, Jarvis Speaks
                    </span>
                </div>
            </div>

            {/* ✏️ EDIT MODAL */}
            {editProject && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                    <div className={`w-[90%] max-w-sm rounded-2xl p-6
                        ${theme === "dark"
                            ? "bg-[#111] text-white"
                            : "bg-white text-black"
                        }`}>
                        <h3 className="text-lg font-semibold mb-2">
                            Rename Project
                        </h3>

                        <p className="text-sm text-gray-500 mb-4">
                            Enter a new name for your project
                        </p>

                        <input
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg mb-6 border"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditProject(null)}
                                className="px-4 py-2 rounded-lg text-sm border"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateProjectName}
                                disabled={updating}
                                className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔔 ALERT */}
            <AppAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                onClose={() => setAlert(prev => ({ ...prev, open: false }))}
            />
        </>
    );
};

export default Dashboard;
