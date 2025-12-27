import React, { useContext, useRef, useState, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiFolder, FiUserCheck } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";

const ProjectCard = ({ project, onDeleteClick, onEditClick }) => {
    const { theme } = useContext(ThemeContext);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div
            className={`
                relative rounded-2xl border overflow-visible
                ${theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"}
            `}
        >
            {/* Preview area */}
            <div className="h-[160px] bg-gray-100 dark:bg-white/5 pointer-events-none" />


            {/* Bottom */}
            <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`
                            w-9 h-9 rounded-full flex items-center justify-center
                            ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}
                        `}
                    >
                        <FiFolder />
                    </div>

                    <p className="text-sm font-medium truncate max-w-[120px]">
                        {project.project_name}
                    </p>
                </div>

                {/* ⋮ MENU */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenu((prev) => !prev);
                        }}
                        className={`
        relative z-[9999] pointer-events-auto
        w-9 h-9 flex items-center justify-center
        rounded-full border transition
        ${theme === "dark"
                                ? "border-white/20 hover:bg-white/10"
                                : "border-gray-300 hover:bg-gray-100"}
    `}
                    >
                        <FiMoreVertical size={18} />
                    </button>



                    {openMenu && (
                        <div
                            className={`
        absolute right-0 top-12 z-[9999]
        w-40 rounded-xl shadow-lg border
        ${theme === "dark"
                                    ? "bg-[#111] border-white/10 text-white"
                                    : "bg-white border-gray-200 text-black"}
    `}
                        >


                            {/* ADMIN */}
                            <button
                                onClick={() => {
                                    onAdminClick(project);
                                    setOpenMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                            >
                                <FiUserCheck />
                                Admin
                            </button>

                            {/* EDIT */}
                            <button
                                onClick={() => {
                                    onEditClick(project);
                                    setOpenMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                            >
                                <FiEdit2 />
                                Edit
                            </button>

                            {/* DELETE */}
                            <button
                                onClick={() => {
                                    onDeleteClick(project);
                                    setOpenMenu(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                            >
                                <FiTrash2 />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
