import React, { useContext, useState } from "react";
import { FiMic } from "react-icons/fi";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";
import LanguageSelector from "./LanguageSelector.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import GoalStepModal from "./GoalStepModal.jsx";
import Cookies from "js-cookie";

const ProjectWorkspace = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";
    const [showGoalStep, setShowGoalStep] = useState(false);
    const [language, setLanguage] = useState(null);

    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(null);
    const STEPS = {
        WORKSPACE: "workspace",
        QUESTIONS: "questions",
        COLORS: "colors",
        FEATURES: "features",
    };
    const [step, setStep] = useState(STEPS.WORKSPACE);


    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        try {
            const token = Cookies.get("access_token");

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/recommendation/generated_question`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        prompt,
                        language: language || "english",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === false) {
                throw new Error(data?.message || "Generation failed");
            }

            // ✅ SAVE SESSION ID
            if (data.session_id) {
                Cookies.set("session_id", data.session_id);
            }

            // ✅ SAVE FIRST QUESTION
            if (data.questions?.length) {
                setFirstQuestion(data.questions[0]);
            }

            setShowGoalStep(true);

        } catch (error) {
            console.error("❌ Generate Error:", error);
            alert(error.message || "Server not reachable");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col"
            style={{
                backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                backgroundColor: isDark ? "#000000" : "#f6f6f6",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* GRID OVERLAY */}
            <div
                className={`absolute inset-0 pointer-events-none
                ${isDark
                        ? "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
                        : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
                    }
                bg-[size:40px_40px]`}
            />

            {/* HEADER (only when modal closed) */}
            {!showGoalStep && <Header />}

            {/* LANGUAGE SELECTOR */}
            {!showGoalStep && (
                <div className="absolute top-[92px] right-6 z-30">
                    <LanguageSelector
                        theme={theme}
                        value={language}
                        onChange={(lang) => setLanguage(lang)}
                    />
                </div>
            )}

            {/* MAIN */}
            <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 flex-1">

                {/* FEATURES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-4xl">
                    {["Clear and precise", "Personalized answers", "Increased efficiency"].map(
                        (title, i) => (
                            <div key={i}>
                                <div className="mb-3 text-xl text-gray-400">✦</div>
                                <h3
                                    className={`font-semibold mb-1 ${isDark ? "text-white" : "text-black"
                                        }`}
                                >
                                    {title}
                                </h3>
                                <p
                                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"
                                        }`}
                                >
                                    Pariatur sint laborum cillum aute consectetur irure.
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* INPUT */}
                <div className="w-full max-w-2xl">
                    <div
                        className={`flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl
                        ${isDark
                                ? "bg-white/5 border-white/10 text-white"
                                : "bg-white border-gray-300 text-black"
                            }`}
                    >
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder='Example: "Explain quantum computing in simple terms"'
                            className={`flex-1 bg-transparent outline-none text-sm
        ${isDark ? "placeholder-gray-500" : "placeholder-gray-400"}`}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleGenerate();
                                }
                            }}
                        />

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition
        ${isDark
                                    ? "bg-white/10 text-white hover:bg-white hover:text-black"
                                    : "bg-black text-white hover:bg-gray-900"
                                }`}
                        >
                            {loading ? "Generating..." : "Send"}
                        </button>

                    </div>
                </div>
            </main>

            {/* GOAL STEP MODAL */}
            {showGoalStep && (
                <GoalStepModal
                    firstQuestion={firstQuestion}
                    onClose={() => setShowGoalStep(false)}
                />
            )}

        </div>
    );
};

export default ProjectWorkspace;




// import React, { useContext, useState } from "react";
// import Header from "./Header.jsx";
// import LanguageSelector from "./LanguageSelector.jsx";
// import GoalStepModal from "./GoalStepModal.jsx";
// import Cookies from "js-cookie";
// import FeaturesSelection from "./FeaturesSelection";
// import ColorSelection from "./ColorSelection";

// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";

// import { ThemeContext } from "../../ThemeProvider.jsx";

// const STEPS = {
//     WORKSPACE: "workspace",
//     QUESTIONS: "questions",
//     COLORS: "colors",
//     FEATURES: "features",
// };

// const ProjectWorkspace = () => {
//     const { theme } = useContext(ThemeContext);
//     const isDark = theme === "dark";

//     const [step, setStep] = useState(STEPS.WORKSPACE);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const [selectedFeatures, setSelectedFeatures] = useState([]);
//     const [language, setLanguage] = useState(null);
//     const [prompt, setPrompt] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [firstQuestion, setFirstQuestion] = useState(null);

//     /* ---------------- GENERATE ---------------- */
//     const handleGenerate = async () => {
//         if (!prompt.trim()) return;

//         setLoading(true);
//         try {
//             const token = Cookies.get("access_token");

//             const response = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/recommendation/generated_question`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         prompt,
//                         language: language || "english",
//                     }),
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok || data.status === false) {
//                 throw new Error(data?.message || "Generation failed");
//             }

//             if (data.session_id) {
//                 Cookies.set("session_id", data.session_id);
//             }

//             if (data.questions?.length) {
//                 setFirstQuestion(data.questions[0]);
//                 setStep(STEPS.QUESTIONS); // ✅ NEXT STEP
//             }

//         } catch (err) {
//             alert(err.message || "Server error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div
//             className="min-h-screen relative overflow-hidden"
//             style={{
//                 backgroundImage: `url(${isDark ? bgDark : bgLight})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             {/* GRID */}
//             <div
//                 className={`absolute inset-0 pointer-events-none
//                 ${isDark
//                         ? "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
//                         : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
//                     }
//                 bg-[size:40px_40px]`}
//             />

//             {/* ================= STEP 1 : WORKSPACE ================= */}
//             {step === STEPS.WORKSPACE && (
//                 <>
//                     <Header />

//                     <div className="absolute top-[92px] right-6 z-30">
//                         <LanguageSelector
//                             theme={theme}
//                             value={language}
//                             onChange={setLanguage}
//                         />
//                     </div>

//                     <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
//                         {/* FEATURES */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 max-w-4xl">
//                             {["Clear and precise", "Personalized answers", "Increased efficiency"].map(
//                                 (title, i) => (
//                                     <div key={i}>
//                                         <h3 className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
//                                             {title}
//                                         </h3>
//                                     </div>
//                                 )
//                             )}
//                         </div>

//                         {/* INPUT */}
//                         <div className="w-full max-w-2xl">
//                             <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl border
//                                 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-300"}
//                             `}>
//                                 <input
//                                     value={prompt}
//                                     onChange={(e) => setPrompt(e.target.value)}
//                                     placeholder="Explain quantum computing"
//                                     className="flex-1 bg-transparent outline-none"
//                                     onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
//                                 />

//                                 <button
//                                     onClick={handleGenerate}
//                                     disabled={loading}
//                                     className="px-6 py-2 rounded-full border"
//                                 >
//                                     {loading ? "Generating..." : "Send"}
//                                 </button>
//                             </div>
//                         </div>
//                     </main>
//                 </>
//             )}

//             {/* ================= STEP 2 : QUESTIONS ================= */}
//             {step === STEPS.QUESTIONS && (
//                 <GoalStepModal
//                     firstQuestion={firstQuestion}
//                     onComplete={() => setStep(STEPS.COLORS)}
//                 />
//             )}

//             {/* ================= STEP 3 : COLORS ================= */}
//             {step === STEPS.COLORS && (
//                 <div className="min-h-screen">
//                     <Header />

//                     <div className="max-w-5xl mx-auto py-20 px-6">
//                         <h2 className="text-3xl font-semibold text-center mb-12">
//                             Choose Brand Colors 🎨
//                         </h2>

//                         <ColorSelection
//                             isDark={isDark}
//                             selected={selectedColor}
//                             setSelected={setSelectedColor}
//                         />

//                         <div className="flex justify-end mt-12">
//                             <button
//                                 disabled={selectedColor === null}
//                                 onClick={() => setStep(STEPS.FEATURES)}
//                                 className={`
//             px-10 py-3 rounded-full border
//             ${selectedColor === null
//                                         ? "opacity-40 cursor-not-allowed"
//                                         : "hover:bg-black hover:text-white"}
//           `}
//                             >
//                                 Continue → Features
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}


//             {/* ================= STEP 4 : FEATURES ================= */}
//             {step === STEPS.FEATURES && (
//                 <div className="min-h-screen">
//                     <Header />

//                     <div className="max-w-6xl mx-auto py-20 px-6">
//                         <h2 className="text-3xl font-semibold text-center mb-12">
//                             Select Website Features 🚀
//                         </h2>

//                         <FeaturesSelection
//                             isDark={isDark}
//                             selected={selectedFeatures}
//                             setSelected={setSelectedFeatures}
//                         />

//                         <div className="flex justify-between mt-12">
//                             <button
//                                 onClick={() => setStep(STEPS.COLORS)}
//                                 className="px-10 py-3 rounded-full border"
//                             >
//                                 ← Back
//                             </button>

//                             <button
//                                 disabled={selectedFeatures.length === 0}
//                                 className={`
//             px-10 py-3 rounded-full
//             ${selectedFeatures.length === 0
//                                         ? "bg-gray-300 cursor-not-allowed"
//                                         : "bg-black text-white hover:bg-gray-800"}
//           `}
//                             >
//                                 Finish Setup
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default ProjectWorkspace;
