// import React, { createContext, useContext, useState } from 'react';
// import { initialProjectData } from './initialData';

// const EditorContext = createContext();

// export const useEditor = () => {
//     const context = useContext(EditorContext);
//     if (!context) {
//         throw new Error('useEditor must be used within an EditorProvider');
//     }
//     return context;
// };

// export const EditorProvider = ({ children }) => {
//     const [projectData, setProjectData] = useState(initialProjectData);
//     const [selectedElementId, setSelectedElementId] = useState(null);

//     const selectElement = (id) => {
//         setSelectedElementId(id);
//     };

//     const updateElement = (id, newAttributes) => {
//         setProjectData((prev) => ({
//             ...prev,
//             elements: {
//                 ...prev.elements,
//                 [id]: {
//                     ...prev.elements[id],
//                     ...newAttributes,
//                 },
//             },
//         }));
//     };

//     const value = {
//         projectData,
//         selectedElementId,
//         selectElement,
//         updateElement,
//         selectedElement: selectedElementId ? projectData.elements[selectedElementId] : null
//     };

//     return (
//         <EditorContext.Provider value={value}>
//             {children}
//         </EditorContext.Provider>
//     );
// };












// "use client";
// import React, { createContext, useContext, useState } from 'react';

// const EditorContext = createContext();

// export const useEditor = () => {
//     const context = useContext(EditorContext);
//     if (!context) throw new Error('useEditor must be used within an EditorProvider');
//     return context;
// };

// export const EditorProvider = ({ children }) => {
//     // 1. Raw Content (Abhi dummy data hai, baad me backend se aayega)
//     const [htmlContent, setHtmlContent] = useState(`
//         <div class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-10">
//             <h1 class="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
//                 Galaxy UI
//             </h1>
//             <p class="text-xl text-gray-400 mb-8 max-w-lg text-center">
//                 Revolutionize your SaaS product with our modern builder. Click any element to inspect.
//             </p>
//             <div class="flex gap-4">
//                 <button class="px-6 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition">Get Started</button>
//                 <button class="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition">Learn More</button>
//             </div>
//         </div>
//     `);
//     const [cssContent, setCssContent] = useState("");
//     const [jsContent, setJsContent] = useState("");

//     // 2. Selection State
//     const [selectedElement, setSelectedElement] = useState(null);
//     const [isSelectMode, setIsSelectMode] = useState(false); // Default false

//     // 3. Selection Handler
//     const handleSelection = (data) => {
//         // console.log("Selected:", data);
//         setSelectedElement(data);
//     };

//     // 4. Update Handler (Optimistic UI Update for Sidebar)
//     const updateElement = (field, value) => {
//         if (!selectedElement) return;

//         setSelectedElement(prev => ({
//             ...prev,
//             [field]: value
//         }));

//         // Note: Real app me yahan HTML string replace logic aayega
//     };

//     const value = {
//         htmlContent, setHtmlContent,
//         cssContent, setCssContent,
//         jsContent, setJsContent,
//         selectedElement,
//         handleSelection,
//         isSelectMode, setIsSelectMode,
//         updateElement
//     };

//     return (
//         <EditorContext.Provider value={value}>
//             {children}
//         </EditorContext.Provider>
//     );
// };


















"use client";
import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext();

export const useEditor = () => {
    return useContext(EditorContext);
};

export const EditorProvider = ({ children }) => {
    // Ye variable store karega ki user ne kis par click kiya
    const [selectedElement, setSelectedElement] = useState(null);

    // Ye hamara Static HTML code hai (Manual Data)
    const [htmlContent, setHtmlContent] = useState(`
        <div class="min-h-screen bg-[#050510] text-white flex flex-col items-center justify-center p-10 font-sans">
            <div class="flex items-center gap-2 mb-8 opacity-80">
                <span class="text-xl font-bold tracking-wide">Galaxy</span>
            </div>
            <h1 class="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent mb-6">
                Revolutionize your<br/>SaaS products
            </h1>
            <p class="text-gray-400 text-xl max-w-2xl text-center mb-10 leading-relaxed">
                Create stunning, professional-quality websites in record time with our powerful UI kit.
            </p>
            <div class="flex gap-4">
                <button class="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">Get Started</button>
                <button class="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 transition">View Demo</button>
            </div>
        </div>
    `);

    return (
        <EditorContext.Provider value={{ selectedElement, setSelectedElement, htmlContent, setHtmlContent }}>
            {children}
        </EditorContext.Provider>
    );
};