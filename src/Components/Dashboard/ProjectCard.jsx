import React from "react";
import { FiMoreVertical } from "react-icons/fi";

const ProjectCard = () => {
    return (
        <div className="rounded-2xl border bg-white overflow-hidden">
            <div className="h-[160px] bg-gradient-to-b from-gray-100 to-gray-200" />

            <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border flex items-center justify-center">
                        🎮
                    </div>

                    <div>
                        <p className="text-sm font-medium">Portfolio_2024</p>
                        <p className="text-xs text-gray-400">edit 1 minute ago</p>
                    </div>
                </div>

                <FiMoreVertical className="text-gray-500" />
            </div>
        </div>
    );
};

export default ProjectCard;
