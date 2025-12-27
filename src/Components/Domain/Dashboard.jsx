import React, { useContext, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import Header from "../Recommendation/Header.jsx";
import { ThemeContext } from "../../ThemeProvider.jsx";

const DomainDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [subdomain, setSubdomain] = useState("");
    const [useCustomFolder, setUseCustomFolder] = useState(false);

    return (
        <div
            className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#fafafa] text-black"}`}
        >
            <div
                className={`absolute inset-0 pointer-events-none ${isDark
                    ? "bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"} bg-size-[32px_32px]`}
            />

            {isDark && (
                <div className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.95)_100%)]" />
            )}

            {isDark && (
                <div className="absolute inset-x-0 top-0 h-56 pointer-events-none z-1 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.06),transparent_65%)] blur-2xl" />
            )}

            <Header />

            <main className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                <div className="mx-auto w-full max-w-6xl">
                    <h1 className="text-2xl font-semibold">Domains</h1>

                    <div className={`mt-1 text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        https://modest-catfish-1.10web.cloud
                    </div>

                    <div className={`mt-6 h-px ${isDark ? "bg-white" : "bg-black/50"}`} />

                    <button
                        type="button"
                        className={`mt-6 w-full flex items-center gap-3 px-4 py-3 rounded-md border text-sm cursor-pointer ${isDark
                            ? "bg-black/60 border-white/20 hover:bg-black/50"
                            : "bg-[#fafafa] border-black/40 hover:bg-zinc-50"}`}
                    >
                        <FiPlus />
                        Create A New Subdomain
                    </button>

                    <div className="mt-10 flex flex-col items-center">
                        <div className="w-full max-w-3xl">
                            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start sm:items-center gap-3 sm:gap-4">
                                <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"} text-center sm:text-right sm:pr-2`}>
                                    Enter Subdomain
                                </div>

                                <div
                                    className={`flex flex-col sm:flex-row items-stretch rounded-md border overflow-hidden ${isDark
                                        ? "border-white/15 bg-black/40"
                                        : "border-black/30 bg-[#fafafa]"}`}
                                >
                                    <input
                                        value={subdomain}
                                        onChange={(e) => setSubdomain(e.target.value)}
                                        placeholder="Enter Subdomain"
                                        className={`flex-1 px-4 py-2.5 outline-none text-sm bg-transparent ${isDark
                                            ? "text-gray-100 placeholder-gray-600"
                                            : "text-black placeholder-gray-400"}`}
                                    />
                                    <div
                                        className={`px-4 py-2.5 sm:py-0 flex items-center justify-center text-sm ${isDark ? "text-white" : "text-gray-600"} ${isDark ? "bg-black/50" : "bg-[#fafafa]"} border-t sm:border-t-0 sm:border-l ${isDark ? "border-white/15" : "border-black/30"}`}
                                    >
                                        .inaiverse.com
                                    </div>
                                </div>
                            </div>

                            <label className={`mt-4 flex items-center gap-3 text-sm sm:ml-[140px] ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                <input
                                    type="checkbox"
                                    checked={useCustomFolder}
                                    onChange={(e) => setUseCustomFolder(e.target.checked)}
                                    className={`h-4 w-4 cursor-pointer appearance-none rounded-[4px] border ${isDark ? "border-white/35" : "border-black/25"}`}
                                    style={{
                                        backgroundColor: useCustomFolder
                                            ? (isDark ? "transparent" : "#2563eb")
                                            : "transparent",
                                        borderColor: useCustomFolder
                                            ? (isDark ? "rgba(255,255,255,0.55)" : "#2563eb")
                                            : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)"),
                                        boxShadow: isDark
                                            ? "0 0 0 1px rgba(255,255,255,0.06)"
                                            : "0 0 0 1px rgba(0,0,0,0.06)",
                                        backgroundImage: useCustomFolder
                                            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M16.7 5.8a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0L3.3 10a1 1 0 1 1 1.4-1.4l3.3 3.3 6.7-6.7a1 1 0 0 1 1.4 0Z' fill='%23ffffff'/%3E%3C/svg%3E\")"
                                            : "none",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "14px 14px",
                                    }}
                                />
                                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                                    Custom Folder For Subdomain
                                </span>
                            </label>

                            <div className="mt-6 flex sm:ml-[140px]">
                                <div
                                    className="rounded-full p-px"
                                    style={{
                                        background: "transparent",
                                        boxShadow: isDark
                                            ? "0 0 0 1px rgba(255,255,255,0.06)"
                                            : "0 0 0 1px rgba(0,0,0,0.45)",
                                    }}
                                >

                                    <button
                                        type="button"
                                        className={`px-6 py-2 rounded-full text-sm inline-flex items-center gap-2 cursor-pointer transition-all duration-200 ${
                                            isDark ? "text-white" : "text-black"
                                        }`}
                                        style={{
                                            background: isDark
                                                ? "transparent"
                                                : "linear-gradient(180deg, rgba(250,250,250,1), rgba(250,250,250,1))",
                                            backdropFilter: "blur(10px)",
                                            WebkitBackdropFilter: "blur(10px)",
                                            boxShadow: isDark
                                                ? "0 0 0 1px rgba(255,255,255,0.16)"
                                                : "0 0 0 1px rgba(0,0,0,0.45)",
                                        }}
                                    >
                                        <FiCheck size={14} />
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DomainDashboard;