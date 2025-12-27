"use client";
import { useState, useContext } from "react";
import { BottomToolbar } from "./BottomToolbar";
import { ChatPanel } from "./ChatPanel";
import { Paperclip, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublishModal from "./PublishModal";
import SubDomainModal from "../Domain/SubDomainModal";
import { ThemeContext } from "../../ThemeProvider";

export default function PreviewPanel() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [inputValue, setInputValue] = useState("");
    const [viewMode, setViewMode] = useState("desktop");
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showSubDomainModal, setShowSubDomainModal] = useState(false);

    const isDark = theme === "dark";

    return (
        <div
            className={`flex flex-col h-screen w-full overflow-hidden font-sans relative
            ${isDark ? "bg-[#0b0b0b] text-white" : "bg-gray-50 text-black"}
        `}
        >
            {/* 🔲 GRID BACKGROUND (Dark only like Dashboard) */}
            {isDark && (
                <div
                    className="absolute inset-0 z-0 pointer-events-none
                    bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
                    linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
                    bg-[size:40px_40px]"
                />
            )}

            {/* ================= HEADER ================= */}
            <header
                className={`h-[60px] flex items-center justify-between px-6 shrink-0 z-50 border-b
                ${isDark
                        ? "bg-[#0f0f0f] border-white/10"
                        : "bg-white border-gray-200"
                    }
            `}
            >
                {/* Left Logo */}
                <div className="flex items-center gap-2">
                    <Paperclip
                        className={`h-5 w-5 -rotate-45 ${isDark ? "text-white" : "text-black"}`}
                    />
                    <span className="font-bold text-lg tracking-tight">
                        Logo
                    </span>
                </div>

                {/* Center Toggle */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 flex items-center p-1 rounded-full border
                    ${isDark
                            ? "bg-white/5 border-white/10"
                            : "bg-gray-100 border-gray-200"
                        }
                `}
                >
                    <button
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition
                        ${isDark
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-500 hover:text-gray-900"
                            }
                    `}
                    >
                        Edit
                    </button>

                    <button
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border
                        ${isDark
                                ? "bg-white text-black border-white"
                                : "bg-white text-black border-gray-200 shadow-sm"
                            }
                    `}
                    >
                        Preview
                    </button>
                </div>

                {/* Right User */}
                <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border
                    ${isDark
                            ? "bg-white/5 border-white/10"
                            : "bg-white border-gray-200"
                        }
                `}
                >
                    <span className="text-sm font-medium">
                        Demo User
                    </span>
                    <User className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </div>
            </header>

            {/* ================= MAIN PREVIEW ================= */}
            <main className="flex-1 relative z-10 w-full h-full flex items-center justify-center p-8 overflow-hidden">
                <div
                    className={`shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out border
                    ${isDark
                            ? "bg-[#050510] border-white/10"
                            : "bg-white border-gray-200"
                        }
                `}
                    style={{
                        width:
                            viewMode === "mobile"
                                ? "375px"
                                : viewMode === "tablet"
                                    ? "768px"
                                    : "100%",
                        height: viewMode === "desktop" ? "100%" : "85%",
                        borderRadius: viewMode === "desktop" ? "0" : "16px",
                    }}
                >
                    <iframe
                        className="w-full h-full border-0"
                        srcDoc={`
    <html>
    <head>
      <style>
        body {
          margin: 0;
          background: #050510;
          font-family: sans-serif;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden; /* ✅ MAIN */
        }

        ::-webkit-scrollbar {
          display: none; /* ✅ Chrome, Edge */
        }
      </style>
    </head>
    <body>
      <div style="text-align:center;">
        <h1 style="
          font-size:56px;
          font-weight:700;
          background:linear-gradient(to right, #A78BFA, #3B82F6);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;">
          Galaxy Preview
        </h1>
        <p style="color:#9ca3af;font-size:18px;">
          Dark & Light preview supported
        </p>
      </div>
    </body>
    </html>
  `}
                        title="Preview"
                    />
                </div>
            </main>

            {/* ================= FLOATING UI ================= */}
            <ChatPanel
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={() => setInputValue("")}
            />

            <BottomToolbar
                viewMode={viewMode}
                onViewChange={setViewMode}
                onPublishClick={() => setShowPublishModal(true)}
            />

            {showPublishModal && (
                <PublishModal
                    onConnectDomain={() => {
                        setShowPublishModal(false);
                        navigate("/domain/connect");
                    }}

                    onCustomDomain={() => {
                        setShowPublishModal(false);
                        navigate("/domain/custom");
                    }}

                    onSubDomain={() => {
                        setShowPublishModal(false);
                        navigate("/sub-domain/dashboard");
                    }}
                />

            )}

            {showSubDomainModal && (
                <SubDomainModal
                    onClose={() => setShowSubDomainModal(false)}
                    onNext={() => {
                        setShowSubDomainModal(false);
                        navigate("/sub-domain/dashboard");
                    }}
                />
            )}
        </div>
    );
}
