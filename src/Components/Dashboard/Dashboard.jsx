import React from "react";
import Header from "./Header";
import { FiPlus, FiEdit2, FiFolder, FiMic } from "react-icons/fi";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header userName="Demo User" />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold mb-10">
                    Welcome Back, Demo
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= LEFT SIDE ================= */}
                    <div className="relative h-full min-h-[420px]">

                        {/* New Project CARD */}
                        <div className="rounded-2xl border bg-white p-10">
                            <div className="w-12 h-12 border rounded-lg flex items-center justify-center mb-6">
                                <FiPlus size={22} />
                            </div>

                            <h2 className="text-xl font-semibold mb-3">
                                New Project
                            </h2>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Fringilla pretium malesuada
                                consequat morbi ac pretium sed et nec.
                            </p>
                        </div>

                        {/* 🎤 MIC – BOTTOM FIXED */}
                        <div className="absolute left-0 bottom-0 flex items-center gap-3 text-gray-500 text-sm">
                            <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-white">
                                <FiMic />
                            </div>
                            <span>Type, Jarvis Speaks</span>
                        </div>
                    </div>


                    {/* ================= RECENT PROJECT ================= */}
                    <div className="rounded-2xl border bg-white p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <FiFolder />
                                <h2 className="text-lg font-semibold">
                                    Recent Project
                                </h2>
                            </div>

                            <button className="text-sm border px-3 py-1 rounded-lg hover:bg-gray-50">
                                View All →
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            resume work on existing builds.
                        </p>

                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between border rounded-full px-5 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                                            🎮
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Portfolio_2024
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                edit 1 minute ago
                                            </p>
                                        </div>
                                    </div>

                                    <FiEdit2 className="text-gray-500" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
