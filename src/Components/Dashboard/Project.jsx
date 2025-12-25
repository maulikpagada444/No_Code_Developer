import React, { useContext } from "react";
import Header from "./Header";
import ProjectCard from "./ProjectCard";
import { ThemeContext } from "../../ThemeProvider.jsx";

const Project = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`
                min-h-screen relative overflow-hidden
                ${theme === "dark"
                    ? "bg-[#0b0b0b] text-white"
                    : "bg-[#fafafa] text-black"
                }
            `}
        >
            {/* GRID BACKGROUND (dark only) */}
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
                    Project
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                        <ProjectCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
