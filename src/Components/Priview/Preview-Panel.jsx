// "use client";
// import { useState } from 'react';
// import { BottomToolbar } from './BottomToolbar';
// import { ChatPanel } from './ChatPanel';
// import { Paperclip, User } from 'lucide-react';
// import { EditorProvider } from '../Editor/EditorContext';
// import EditorCanvas from '../Editor/EditorCanvas';
// import PropertiesPanel from '../Editor/PropertiesPanel';

// export default function PreviewPanel() {
//   const [viewMode, setViewMode] = useState('desktop');
//   const [inputValue, setInputValue] = useState('');
//   const [isEditMode, setIsEditMode] = useState(true);

//   return (
//     <EditorProvider>
//       <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden font-sans">

//         {/* 1. Header (Matches Image) */}
//         <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-50 relative">

//           {/* Left: Logo */}
//           <div className="flex items-center gap-2">
//             <Paperclip className="h-5 w-5 -rotate-45 text-black" />
//             <span className="font-bold text-lg text-black tracking-tight">Logo</span>
//           </div>

//           {/* Center: Edit/Preview Toggle */}
//           <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
//             <button
//               onClick={() => setIsEditMode(true)}
//               className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isEditMode ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
//             >
//               {/* Edit Icon (Simple Pencil) */}
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
//               </svg>
//               Edit
//             </button>
//             <button
//               onClick={() => setIsEditMode(false)}
//               className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!isEditMode ? 'bg-white shadow-sm text-gray-900 border border-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
//             >
//               {/* Preview Icon (Eye/Layout) */}
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                 <line x1="9" y1="3" x2="9" y2="21" />
//               </svg>
//               Preview
//             </button>
//           </div>

//           {/* Right: User Profile */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md bg-white">
//               <span className="text-sm font-medium text-gray-700">Demo User</span>
//               <User className="h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         </header>

//         {/* 2. Main Content Wrapper (Flex Row for Sidebar) */}
//         <div className="flex-1 flex overflow-hidden">

//           {/* Main Preview Area */}
//           <main className="flex-1 relative w-full h-full bg-[#f8f9fa] flex items-center justify-center p-8 overflow-hidden">
//             {/* Background Grid Pattern (Subtle) */}
//             <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
//               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
//             />

//             {/* Website Container */}
//             <div
//               className="bg-[#0a0a0a] shadow-2xl relative overflow-hidden transition-all duration-500 ease-in-out border border-gray-900/10"
//               style={{
//                 width: viewMode === 'mobile' ? '375px' : viewMode === 'tablet' ? '768px' : '100%',
//                 height: viewMode === 'desktop' ? '100%' : '85%', // Adjust height for devices
//                 maxHeight: '100%',
//                 borderRadius: viewMode === 'desktop' ? '0' : '16px',
//               }}
//             >
//               <EditorCanvas />
//             </div>
//           </main>

//           {/* Right Properties Panel (Conditional) */}
//           {isEditMode && <PropertiesPanel />}

//         </div>


//         {/* 3. Floating Overlays (Chat & Toolbar) */}

//         {/* Chat Input */}
//         <ChatPanel
//           inputValue={inputValue}
//           onInputChange={setInputValue}
//           onSubmit={() => setInputValue('')}
//         />

//         {/* Bottom Toolbar */}
//         <BottomToolbar
//           viewMode={viewMode}
//           onViewChange={setViewMode}
//           onPublishClick={() => alert('Publishing...')}
//         />

//       </div>
//     </EditorProvider>
//   );
// }


















// "use client";
// import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback, useMemo } from 'react';
// import { useEditor } from '../Editor/EditorContext';

// // --- AAPKA PURANA INTERACTION SCRIPT (As is) ---
// const interactionScript = String.raw`(() => {
//   const style = document.createElement('style');
//   const cssContent = "[data-nextinai-hover] { outline: 2px dashed #3B82F6 !important; cursor: pointer !important; transition: outline 0.1s ease-in-out; }\\n[data-nextinai-selected] { outline: 2px solid #93C5FD !important; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5) !important; }";
//   style.textContent = cssContent;
//   document.head.appendChild(style);

//   let lastHovered = null;
//   let selectionEnabled = false;

//   const sendMessage = (payload) => {
//     try { 
//       if (window.parent && window.parent !== window) {
//         window.parent.postMessage(payload, '*');
//       }
//     } catch (e) { console.warn('Failed to send message:', e); }
//   };

//   // Listen for Mode Change from React
//   window.addEventListener('message', (event) => {
//       const data = event.data || {};
//       if (data && data.type === 'nextinai-select-mode') {
//         selectionEnabled = !!data.enabled;
//         if (!selectionEnabled) {
//              // Cleanup if mode disabled
//              document.querySelectorAll('[data-nextinai-selected]').forEach(el => el.removeAttribute('data-nextinai-selected'));
//              document.querySelectorAll('[data-nextinai-hover]').forEach(el => el.removeAttribute('data-nextinai-hover'));
//         }
//       }
//   });

//   // Hover Effects
//   document.body.addEventListener('mouseover', (e) => {
//       if (!selectionEnabled) return;
//       e.target.setAttribute('data-nextinai-hover', 'true');
//   });

//   document.body.addEventListener('mouseout', (e) => {
//       if(e.target && e.target.removeAttribute) e.target.removeAttribute('data-nextinai-hover');
//   });

//   // Click & Select Logic
//   document.body.addEventListener('click', (e) => {
//       if (!selectionEnabled) return;

//       e.preventDefault();
//       e.stopPropagation();

//       // Clear previous selection
//       document.querySelectorAll('[data-nextinai-selected]').forEach(el => el.removeAttribute('data-nextinai-selected'));

//       const target = e.target;
//       target.setAttribute('data-nextinai-selected', 'true');

//       // Get Computed Styles
//       const computedStyles = window.getComputedStyle(target);
//       const currentStyles = {
//         'color': computedStyles.color,
//         'background-color': computedStyles.backgroundColor,
//         'font-size': computedStyles.fontSize,
//         'font-weight': computedStyles.fontWeight,
//         'padding': computedStyles.padding,
//         'margin': computedStyles.margin,
//         'width': computedStyles.width,
//         'height': computedStyles.height,
//         'display': computedStyles.display
//       };

//       // Get Attributes
//       const attributes = {};
//       for (let i = 0; i < target.attributes.length; i++) {
//         const attr = target.attributes[i];
//         if (!attr.name.startsWith('data-nextinai')) {
//           attributes[attr.name] = attr.value;
//         }
//       }

//       // Simple Selector Generator
//       const tagName = target.tagName.toLowerCase();
//       const id = target.id ? '#' + target.id : '';
//       const className = target.className ? '.' + target.className.split(' ')[0] : ''; // Simple class selector
//       const selector = tagName + id + className;

//       // Send to React
//       sendMessage({
//         type: 'nextinai-select',
//         tag_name: tagName,
//         inner_text: target.innerText, // Content for editing
//         selector: selector,
//         current_styles: currentStyles,
//         attributes: attributes
//       });
//   }, true);

// })();`;


// // --- REACT COMPONENT STARTS ---

// const PreviewPanel = forwardRef((props, ref) => {
//   // Context se data uthaya
//   const { htmlContent, cssContent, jsContent, isSelectMode, handleSelection, setIsSelectMode } = useEditor();
//   const { viewMode = 'desktop' } = props; // Props se viewMode le rahe hain

//   const iframeRef = useRef(null);
//   useImperativeHandle(ref, () => iframeRef.current);

//   // 1. Iframe Content Builder
//   const buildSrcDoc = useCallback((h, c, j) => {
//     return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="utf-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <script src="https://cdn.tailwindcss.com"></script>
//   <style>
//     body { margin: 0; font-family: sans-serif; }
//     ${c}
//   </style>
//   <script>${interactionScript}</script>
// </head>
// <body>
//   ${h}
//   <script>${j}</script>
// </body>
// </html>`;
//   }, []);

//   // 2. Iframe Update Effect
//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;
//     iframe.srcdoc = buildSrcDoc(htmlContent, cssContent, jsContent);
//   }, [htmlContent, cssContent, jsContent, buildSrcDoc]);

//   // 3. Message Listener (Iframe -> React)
//   useEffect(() => {
//     const onMessage = (ev) => {
//       const data = ev.data || {};
//       if (!data || typeof data !== 'object') return;

//       if (data.type === 'nextinai-select') {
//         handleSelection(data); // Context update karega
//         // console.log("Selected from Iframe:", data);
//       }
//     };
//     window.addEventListener('message', onMessage);
//     return () => window.removeEventListener('message', onMessage);
//   }, [handleSelection]);

//   // 4. Select Mode Sync (React -> Iframe)
//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (iframe && iframe.contentWindow) {
//       // Thoda delay taaki iframe load ho jaye
//       setTimeout(() => {
//         iframe.contentWindow.postMessage({
//           type: 'nextinai-select-mode',
//           enabled: isSelectMode
//         }, '*');
//       }, 500);
//     }
//   }, [isSelectMode, htmlContent]); // htmlContent change hone par bhi mode bhejte raho

//   // Width Calculator
//   const getWidth = () => {
//     switch (viewMode) {
//       case 'mobile': return '375px';
//       case 'tablet': return '768px';
//       default: return '100%';
//     }
//   };

//   return (
//     <div className="relative h-full w-full bg-gray-100 flex flex-col">

//       {/* Canvas Area */}
//       <div className="flex-1 overflow-auto flex justify-center py-8 bg-slate-100/50">
//         <iframe
//           ref={iframeRef}
//           title="Live Preview"
//           className="bg-white shadow-2xl transition-all duration-300 ease-in-out border-0"
//           style={{
//             width: getWidth(),
//             height: viewMode === 'desktop' ? '100%' : '800px', // Mobile mode me height fix rakhein
//             minHeight: '100vh',
//             borderRadius: viewMode === 'desktop' ? 0 : '12px',
//           }}
//           sandbox="allow-scripts allow-same-origin"
//         />
//       </div>

//       {/* Floating Toggle Button */}
//       <button
//         onClick={() => setIsSelectMode(!isSelectMode)}
//         className={`absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-all z-50 ${isSelectMode
//           ? 'bg-blue-600 text-white ring-2 ring-blue-300'
//           : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
//           }`}
//       >
//         <span className={`w-2 h-2 rounded-full ${isSelectMode ? 'bg-green-400' : 'bg-gray-400'}`} />
//         {isSelectMode ? 'Editing Enabled' : 'Enable Editing'}
//       </button>

//     </div>
//   );
// });

// PreviewPanel.displayName = 'PreviewPanel';
// export default PreviewPanel;





















"use client";
import React, { useEffect, useRef } from 'react';
import { useEditor } from '../Editor/EditorContext';
import PropertiesPanel from '../Editor/PropertiesPanel'; // Sidebar import

// --- YE SCRIPT IFRAME KE ANDAR CHALEGI ---
const injectScript = `
  <script>
    // 1. Hover Effect ke liye CSS add karo
    const style = document.createElement('style');
    style.innerHTML = \`
      [data-hover="true"] { outline: 2px dashed #3B82F6 !important; cursor: pointer; }
      [data-selected="true"] { outline: 2px solid #60A5FA !important; }
    \`;
    document.head.appendChild(style);

    // 2. Click aur Hover Listeners
    document.body.addEventListener('mouseover', (e) => {
      e.target.setAttribute('data-hover', 'true');
    });

    document.body.addEventListener('mouseout', (e) => {
      e.target.removeAttribute('data-hover');
    });

    document.body.addEventListener('click', (e) => {
      e.preventDefault(); // Link ko open hone se roko
      e.stopPropagation(); // Sirf isi element ko select karo, piche wale ko nahi

      // Purana selection hatao
      document.querySelectorAll('[data-selected]').forEach(el => el.removeAttribute('data-selected'));
      
      // Naya selection mark karo
      e.target.setAttribute('data-selected', 'true');

      // 3. React (Parent) ko Message bhejo
      window.parent.postMessage({
        type: 'ELEMENT_CLICKED',
        payload: {
          tagName: e.target.tagName.toLowerCase(),
          text: e.target.innerText,
          classes: e.target.className,
          // Styles bhi bhej sakte hain
          color: window.getComputedStyle(e.target).color
        }
      }, '*');
    });
  </script>
`;

export default function PreviewPanel() {
  const { htmlContent, setSelectedElement, selectedElement } = useEditor();
  const iframeRef = useRef(null);

  // HTML content taiyaar karo (Tailwind + Content + Script)
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>body { margin: 0; }</style>
      </head>
      <body>
        ${htmlContent}
        ${injectScript}
      </body>
    </html>
  `;

  // React side listener: Iframe ki baat sunne ke liye
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'ELEMENT_CLICKED') {
        // Context update karo taaki sidebar khul jaye
        setSelectedElement(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [setSelectedElement]);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">

      {/* LEFT SIDE: PREVIEW */}
      <div className="flex-1 flex justify-center py-8">
        <iframe
          title="Website Preview"
          className="bg-white shadow-2xl transition-all duration-300"
          style={{ width: '100%', maxWidth: '1200px', height: '90%', borderRadius: '12px', border: 'none' }}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* RIGHT SIDE: SIDEBAR (Sirf tab dikhega jab kuch select hoga) */}
      {selectedElement && (
        <div className="w-[320px] bg-white border-l shadow-xl z-50 h-full">
          <PropertiesPanel />
        </div>
      )}

    </div>
  );
}