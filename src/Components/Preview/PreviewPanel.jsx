"use client";

import { useState, useContext, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import { BottomToolbar } from "./BottomToolbar";
import { ChatPanel } from "./ChatPanel";
import PublishModal from "./PublishModal";
import SubDomainModal from "../Domain/SubDomainModal";
import Header from "./Header";

import { ThemeContext } from "../../ThemeProvider";
import { EditorProvider, useEditor } from "../Editor/EditorContext";
import PropertiesPanel from "../Editor/PropertiesPanel";

/* ---------------- IFRAME INTERACTION SCRIPT ---------------- */
const interactionScript = `
<script>
  const style = document.createElement('style');
  style.textContent = \`
    [data-hover="true"] { outline: 2px dashed #3B82F6 !important; cursor: pointer; }
    [data-selected="true"] { outline: 2px solid #3B82F6 !important; }
  \`;
  document.head.appendChild(style);

  document.body.addEventListener('mouseover', e => {
    e.target.setAttribute('data-hover', 'true');
  });

  document.body.addEventListener('mouseout', e => {
    e.target.removeAttribute('data-hover');
  });

  document.body.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    document
      .querySelectorAll('[data-selected]')
      .forEach(el => el.removeAttribute('data-selected'));

    e.target.setAttribute('data-selected', 'true');

    const computed = window.getComputedStyle(e.target);

    window.parent.postMessage({
      type: 'ELEMENT_CLICKED',
      payload: {
        tagName: e.target.tagName.toLowerCase(),
        text: e.target.innerText,
        classes: e.target.className,
        styles: {
          width: computed.width,
          height: computed.height,
          padding: computed.padding,
          margin: computed.margin,
          display: computed.display
        }
      }
    }, '*');
  });

  window.addEventListener('message', e => {
    if (e.data.type === 'DESELECT') {
      document
        .querySelectorAll('[data-selected]')
        .forEach(el => el.removeAttribute('data-selected'));
    }
  });
</script>
`;

/* ---------------- MAIN COMPONENT ---------------- */
function PreviewContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state || {};
    const {
        session_id: sessionIdFromRoute,
        blueprint: blueprintFromRoute,
        html: htmlFromRoute,
    } = locationState;
    const { theme } = useContext(ThemeContext);
    const { htmlContent, setHtmlContent, selectedElement, setSelectedElement } =
        useEditor();

    const iframeRef = useRef(null);
    const hasAutoFetchedRef = useRef(false);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const isDark = theme === "dark";

    /* ✅ FIX: MISSING STATE */
    const [isLoading, setIsLoading] = useState(false);

    const [mode, setMode] = useState("preview");
    const [inputValue, setInputValue] = useState("");
    const [viewMode, setViewMode] = useState("desktop");
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showSubDomainModal, setShowSubDomainModal] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);  // Chat visibility state
    const [isInteractMode, setIsInteractMode] = useState(false);  // 👈 Interact mode toggle
    const [selectedElementName, setSelectedElementName] = useState("");  // 👈 For chatbot display

    /* ---------------- KEYBOARD LISTENER FOR CHAT ---------------- */
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only in edit mode
            if (mode !== "edit") return;

            // Ignore if already typing in input
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

            // Ignore modifier keys alone
            if (["Shift", "Control", "Alt", "Meta", "CapsLock", "Tab", "Escape"].includes(e.key)) return;

            // Only handle single character keys
            if (e.key.length === 1) {
                // If chat is NOT open, open it and add the key
                if (!isChatOpen) {
                    e.preventDefault();  // Prevent the key from being typed again when input focuses
                    setIsChatOpen(true);
                    setInputValue(e.key);  // Set (not append) the first key
                }
                // If chat IS already open, let the input handle it naturally
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mode, isChatOpen]);

    useEffect(() => {
        if (location.state?.html) {
            setHtmlContent(location.state.html);
        }
    }, [location.state, setHtmlContent]);



    /* ---------------- HANDLE IFRAME MESSAGE ---------------- */
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "ELEMENT_CLICKED") {
                const payload = event.data.payload;

                if (isInteractMode) {
                    // In Interact mode: Open chatbot with selected element
                    const elementName = payload.id || payload.className?.split(' ')[0] || payload.tagName || 'Element';
                    setSelectedElementName(elementName);
                    setIsChatOpen(true);
                    setInputValue(`[Selected: ${elementName}] `);
                    // Don't set selectedElement to avoid opening Properties Panel
                } else {
                    // Normal mode: Open Properties Panel
                    setSelectedElement(payload);
                    if (mode !== "edit") setMode("edit");
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [mode, isInteractMode, setSelectedElement]);

    /* ---------------- DESELECT HANDLING ---------------- */
    useEffect(() => {
        if (!selectedElement && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: "DESELECT" },
                "*"
            );
        }
    }, [selectedElement]);

    /* ---------------- IFRAME SOURCE ---------------- */
    const fullSource = `
<!DOCTYPE html>
<html>
<head>
  <script>
    // Suppress Tailwind CDN warning in development
    (function() {
      var origWarn = console.warn;
      console.warn = function() {
        if (arguments[0] && arguments[0].includes && arguments[0].includes('cdn.tailwindcss.com')) return;
        origWarn.apply(console, arguments);
      };
    })();
  </script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      overflow-x: hidden;
      background: #050510;
      font-family: sans-serif;
    }
    ::-webkit-scrollbar { display: none; }
  </style>
</head>
<body>
  ${htmlContent || ""}
  ${isInteractMode ? interactionScript : ""}
</body>
</html>
`;

    /* ---------------- GENERATE WEBSITE ---------------- */
    const generateWebsite = useCallback(async () => {
        try {
            setIsLoading(true);

            const token = Cookies.get("access_token");

            const res = await fetch(`${BASE_URL}/project/generate-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    session_id: sessionIdFromRoute,
                    blueprint: blueprintFromRoute,
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.status) {
                throw new Error("Code generation failed");
            }

            setHtmlContent(data.generated_code || data.html);
        } catch (err) {
            console.error("Generate error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [BASE_URL, blueprintFromRoute, sessionIdFromRoute, setHtmlContent]);

    /* ---------------- ACCEPT ROUTE HTML ---------------- */
    useEffect(() => {
        if (htmlFromRoute) {
            setHtmlContent(htmlFromRoute);
        }
    }, [htmlFromRoute, setHtmlContent]);

    /* ---------------- AUTO FETCH WHEN NEEDED ---------------- */
    useEffect(() => {
        if (
            !htmlFromRoute &&
            sessionIdFromRoute &&
            blueprintFromRoute &&
            !hasAutoFetchedRef.current
        ) {
            hasAutoFetchedRef.current = true;
            generateWebsite();
        }
    }, [blueprintFromRoute, htmlFromRoute, sessionIdFromRoute, generateWebsite]);

    /* ---------------- RENDER ---------------- */
    return (
        <div
            className={`flex flex-col h-screen w-full overflow-hidden font-sans relative
      ${isDark ? "bg-[#0B0B0B] text-white" : "bg-gray-50 text-black"}`}
        >
            {isDark && (
                <div
                    className="absolute inset-0 z-0 pointer-events-none
          bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          bg-[size:40px_40px]"
                />
            )}

            <Header mode={mode} onModeChange={setMode} />

            <div className="flex-1 flex overflow-hidden relative z-10">
                <main className="flex-1 flex">
                    <div
                        className="overflow-hidden transition-all"
                        style={{
                            width:
                                viewMode === "mobile"
                                    ? "375px"
                                    : viewMode === "tablet"
                                        ? "768px"
                                        : "100%",
                            height: "100%",
                            margin: viewMode === "desktop" ? "0" : "0 auto",
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            className="w-full h-full border-0"
                            srcDoc={fullSource}
                            title="Preview"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </main>

                {selectedElement && mode === "edit" && <PropertiesPanel />}
            </div>

            {mode === "edit" && (
                <>
                    <ChatPanel
                        inputValue={inputValue}
                        isLoading={isLoading}
                        onInputChange={setInputValue}
                        sessionId={sessionIdFromRoute}
                        isOpen={isChatOpen}
                        selectedElementName={selectedElementName}
                        onClose={() => {
                            setIsChatOpen(false);
                            setInputValue("");
                            setSelectedElementName("");
                        }}
                        onCodeUpdate={async (data) => {
                            // If blueprint was updated, regenerate code
                            if (data.blueprint_updated) {
                                await generateWebsite();
                            }
                        }}
                    />

                    <BottomToolbar
                        viewMode={viewMode}
                        onViewChange={setViewMode}
                        onPublishClick={() => setShowPublishModal(true)}
                        isInteractMode={isInteractMode}
                        onInteractToggle={() => setIsInteractMode(prev => !prev)}
                    />
                </>
            )}

            {showPublishModal && (
                <PublishModal
                    onClose={() => setShowPublishModal(false)}
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
                    onNext={() => navigate("/sub-domain/dashboard")}
                />
            )}
        </div>
    );
}

/* ---------------- WRAPPER ---------------- */
export default function PreviewPanelWrapper() {
    return (
        <EditorProvider>
            <PreviewContent />
        </EditorProvider>
    );
}
