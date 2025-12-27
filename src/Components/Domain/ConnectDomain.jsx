import React, { useContext, useMemo, useState } from "react";
import Header from "../Recommendation/Header.jsx";
import { ThemeContext } from "../../ThemeProvider.jsx";

const ConnectDomain = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [domain, setDomain] = useState("");

    const helperText = useMemo(() => {
        return "Boost your online presence and visibility with a custom domain.";
    }, []);

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

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
                <div className="mx-auto w-full max-w-5xl">
                    <h1 className="text-xl sm:text-2xl font-semibold">Connect a domain</h1>
                    <div className={`mt-1 text-xs ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        {helperText}
                    </div>

                    <div
                        className={`mt-8 rounded-lg border ${isDark ? "border-white/15 bg-black/30" : "border-black bg-[#f6f6f6]"}`}
                        style={{
                            boxShadow: isDark
                                ? "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px rgba(0,0,0,0.55)"
                                : "0 0 0 1px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.06)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                        }}
                    >
                        <div className="px-5 sm:px-7 py-6 sm:py-7 h-[50vh]">
                            <div className="text-lg font-medium">
                                What domain do you want to connect to Dheray?
                            </div>
                            <div className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                Enter the custom domain you want to connect (ex: mysite.com)
                            </div>

                            <div
                                className={`mt-4 h-px w-full ${isDark ? "bg-white/50" : "bg-black"}`}
                                style={{
                                    boxShadow: isDark ? undefined : "0 1px 0 rgba(0,0,0,0.18)",
                                }}
                            />

                            <div
                                className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4"
                            >
                                <div
                                    className={`flex items-center rounded-full border overflow-hidden w-full sm:w-[420px] ${isDark
                                        ? "border-white/15 bg-black/35"
                                        : "border-black/30 bg-white"}`}
                                    style={{
                                        boxShadow: isDark
                                            ? "0 0 0 1px rgba(255,255,255,0.04)"
                                            : "0 0 0 1px rgba(0,0,0,0.10)",
                                    }}
                                >
                                    <div className={`pl-4 pr-2 flex items-center ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        placeholder="e.g. mystunningwebsite.com"
                                        className={`flex-1 h-9 sm:h-10 px-2 pr-4 outline-none text-sm bg-transparent ${isDark
                                            ? "text-gray-100 placeholder-gray-600"
                                            : "text-black placeholder-gray-400"}`}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className={`cursor-pointer h-9 sm:h-10 px-5 rounded-full text-sm font-medium transition-all self-start sm:self-auto ${isDark
                                        ? "text-white hover:brightness-110 active:brightness-95"
                                        : "border border-black/30 text-black hover:bg-white active:bg-zinc-50"}`}
                                    style={{
                                        backgroundColor: isDark ? "rgba(0,0,0,0.55)" : undefined,
                                        backgroundImage: isDark
                                            ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))"
                                            : "linear-gradient(180deg, rgba(255,255,255,1), rgba(243,243,243,1))",
                                        boxShadow: isDark
                                            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 1px rgba(255,255,255,0.16), 0 10px 24px rgba(0,0,0,0.55)"
                                            : "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 1px rgba(0,0,0,0.10)",
                                    }}
                                >
                                    Let&apos;s Go
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConnectDomain;
