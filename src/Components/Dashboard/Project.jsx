import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Cookies from "js-cookie";

const Project = () => {
    const { theme } = useContext(ThemeContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteProject, setDeleteProject] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [newProjectName, setNewProjectName] = useState("");
    const [updating, setUpdating] = useState(false);

    const extractProjects = (data) => {
        if (Array.isArray(data)) return data;
        if (Array.isArray(data?.projects)) return data.projects;
        if (Array.isArray(data?.data?.projects)) return data.data.projects;
        if (Array.isArray(data?.data)) return data.data;
        return [];
    };

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const token = Cookies.get("access_token");

                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/project/list`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                const allProjects = extractProjects(data);
                setProjects(allProjects);

            } catch (err) {
                console.error("❌ Project list error:", err);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProjects();
    }, []);

    const handleDeleteProject = async () => {
        try {
            setDeleting(true);
            const token = Cookies.get("access_token");

            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/auth/project/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        project_id: deleteProject.project_id,
                    }),
                }
            );

            const data = await res.json();

            if (data?.status === true) {
                setProjects((prev) =>
                    prev.filter(
                        (p) => p.project_id !== deleteProject.project_id
                    )
                );
                setDeleteProject(null);
            } else {
                alert(data?.message || "Delete failed");
            }
        } catch (err) {
            console.error("❌ Delete error:", err);
            alert("Something went wrong");
        } finally {
            setDeleting(false);
        }
    };

    const handleUpdateProjectName = async () => {
        if (!newProjectName.trim()) return;

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
                        new_project_name: newProjectName,
                    }),
                }
            );

            const data = await res.json();

            if (data?.status === true) {
                setProjects((prev) =>
                    prev.map((p) =>
                        p.project_id === editProject.project_id
                            ? { ...p, project_name: newProjectName }
                            : p
                    )
                );
                setEditProject(null);
            } else {
                alert(data?.message || "Update failed");
            }
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
                    <div
                        className="
                        absolute inset-0 pointer-events-none
                        bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                        linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                        bg-[size:40px_40px]
                    "
                    />
                )}

                <Header />

                <div className="relative max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-3xl font-semibold mb-10">
                        All Projects
                    </h1>

                    {loading ? (
                        <p className="text-sm opacity-60">Loading projects...</p>
                    ) : projects.length === 0 ? (
                        <p className="text-sm opacity-60">No projects found</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.project_id}   // ✅ VERY IMPORTANT
                                    project={project}
                                    onDeleteClick={(p) => setDeleteProject(p)}
                                    onEditClick={(p) => {
                                        setEditProject(p);
                                        setNewProjectName(p.project_name);
                                    }}
                                />
                            ))}

                        </div>
                    )}
                </div>
            </div>
            {editProject && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`
                w-[90%] max-w-sm rounded-2xl p-6 shadow-2xl
                ${theme === "dark"
                                ? "bg-[#111] text-white border border-white/10"
                                : "bg-white text-black border border-gray-200"}
            `}
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            Rename Project
                        </h3>

                        <p className="text-sm text-gray-500 mb-4">
                            Enter a new name for your project
                        </p>

                        <input
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className={`
                    w-full px-4 py-2 rounded-lg mb-6 outline-none border
                    ${theme === "dark"
                                    ? "bg-black border-white/10 text-white"
                                    : "bg-white border-gray-300"}
                `}
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditProject(null)}
                                className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateProjectName}
                                disabled={updating}
                                className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteProject && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div
                        className={`
                w-[90%] max-w-sm rounded-2xl p-6 shadow-2xl
                ${theme === "dark"
                                ? "bg-[#111] text-white border border-white/10"
                                : "bg-white text-black border border-gray-200"
                            }
            `}
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            Delete Project
                        </h3>

                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                                {deleteProject.project_name}
                            </span>
                            ?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteProject(null)}
                                className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDeleteProject}
                                disabled={deleting}
                                className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Project;
