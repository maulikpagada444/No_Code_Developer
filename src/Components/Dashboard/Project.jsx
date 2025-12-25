import React from "react";
import Header from "./Header";
import ProjectCard from "./ProjectCard";

const Project = () => {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold mb-8">
                    Project
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                        <ProjectCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Project;
