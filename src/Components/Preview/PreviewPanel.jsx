"use client";
import { useState, useContext, useEffect, useRef } from "react";
import { BottomToolbar } from "./BottomToolbar";
import { ChatPanel } from "./ChatPanel";
import { Paperclip, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublishModal from "./PublishModal";
import SubDomainModal from "../Domain/SubDomainModal";
import { ThemeContext } from "../../ThemeProvider";
import Header from "./Header";
import { EditorProvider, useEditor } from '../Editor/EditorContext';
import PropertiesPanel from '../Editor/PropertiesPanel';

// Script injected into iframe to handle clicks and hover effects
const interactionScript = `
  <script>
    const style = document.createElement('style');
    style.textContent = \`
      [data-hover="true"] { outline: 2px dashed #3B82F6 !important; cursor: pointer; }
      [data-selected="true"] { outline: 2px solid #3B82F6 !important; }
    \`;
    document.head.appendChild(style);

    document.body.addEventListener('mouseover', (e) => {
      e.target.setAttribute('data-hover', 'true');
    });

    document.body.addEventListener('mouseout', (e) => {
      e.target.removeAttribute('data-hover');
    });

    document.body.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Clear previous selection
      document.querySelectorAll('[data-selected]').forEach(el => el.removeAttribute('data-selected'));
      e.target.setAttribute('data-selected', 'true');

      // Get styles
      const computed = window.getComputedStyle(e.target);
      
      // Send message to parent
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

    // Listen for deselection from parent
    window.addEventListener('message', (e) => {
       if(e.data.type === 'DESELECT') {
          document.querySelectorAll('[data-selected]').forEach(el => el.removeAttribute('data-selected'));
       }
    });
  </script>
`;

function PreviewContent() {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const { htmlContent, selectedElement, setSelectedElement } = useEditor();
    const iframeRef = useRef(null);

    // State from 'main' branch
    const [mode, setMode] = useState("preview");
    const [inputValue, setInputValue] = useState("");
    const [viewMode, setViewMode] = useState("desktop");
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showSubDomainModal, setShowSubDomainModal] = useState(false);

    const isDark = theme === "dark";

    // Handle "Element Clicked" from Iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'ELEMENT_CLICKED') {
                setSelectedElement(event.data.payload);
                // Switch to edit mode automatically if an element is clicked? 
                // Or just show properties? For now, let's keep it simple.
                if (mode !== 'edit') setMode('edit');
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [setSelectedElement, mode]);

    // Deselect logic
    useEffect(() => {
        if (!selectedElement && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage({ type: 'DESELECT' }, '*');
        }
    }, [selectedElement]);

    const fullSource = `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { 
                margin: 0; 
                overflow-x: hidden; 
                background: #050510; /* Default background from context/placeholder */
                font-family: sans-serif;
            }
            ::-webkit-scrollbar { display: none; }
        </style>
      </head>
      <body>
         ${htmlContent}
         ${interactionScript}
      </body>
      </html>
    `;

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
            <Header mode={mode} onModeChange={setMode} />

            {/* ================= MAIN PREVIEW ================= */}
            {/* Added 'flex overflow-hidden' to wrapper to support sidebar layout */}
            <div className="flex-1 flex overflow-hidden relative z-10">

                <main className="flex-1 relative w-full h-full flex items-center justify-center p-8 overflow-hidden">
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
                            ref={iframeRef}
                            className="w-full h-full border-0"
                            srcDoc={fullSource}
                            title="Preview"
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </main>

                {/* Right Panel - Only show if selectedElement is present */}
                {selectedElement && (
                    <PropertiesPanel />
                )}

            </div>

            {/* 🔥 SHOW ONLY IN EDIT MODE */}
            {mode === "edit" && (
                <>
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
                </>
            )}


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

export default function PreviewPanelWrapper() {
    return (
        <EditorProvider>
            <PreviewContent />
        </EditorProvider>
    );
}
