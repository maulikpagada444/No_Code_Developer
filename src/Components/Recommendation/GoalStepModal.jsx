// import React, { useContext, useState } from "react";
// import { ThemeContext } from "../../ThemeProvider.jsx";
// import Header from "./Header.jsx";
// import Cookies from "js-cookie";

// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";
// import ColorSelection from "./ColorSelection.jsx";

// /* ---------------- CONFIG ---------------- */
// const OPTION_TYPES = ["options", "optional", "select", "radio"];

// const GoalStepModal = ({ onClose, firstQuestion }) => {
//     const { theme } = useContext(ThemeContext);
//     const isDark = theme === "dark";

//     const [question, setQuestion] = useState(firstQuestion);
//     const [selected, setSelected] = useState(null);
//     const [textAnswer, setTextAnswer] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [isFinished, setIsFinished] = useState(false);

//     if (!question) return null;

//     /* ---------------- TYPE NORMALIZATION ---------------- */
//     const questionType = question?.type;

//     const optionList =
//         question?.options ||
//         question?.optional?.options ||
//         null;

//     const isOptionType =
//         OPTION_TYPES.includes(questionType) &&
//         Array.isArray(optionList);

//     /* ---------------- CONTINUE ---------------- */
//     const handleContinue = async () => {
//         const answer =
//             questionType === "text"
//                 ? textAnswer
//                 : selected;

//         if (!answer) return;

//         setLoading(true);

//         try {
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${Cookies.get("access_token")}`,
//                     },
//                     body: JSON.stringify({
//                         session_id: Cookies.get("session_id"),
//                         question_id: question.id,
//                         answer,
//                     }),
//                 }
//             );

//             const data = await res.json();
//             console.log("⬅️ Next Question:", data);

//             const nextQuestion =
//                 data?.next_question ||
//                 data?.question ||
//                 data?.questions?.[0] ||
//                 null;

//             if (nextQuestion?.id) {
//                 setQuestion(nextQuestion);
//                 setSelected(null);
//                 setTextAnswer("");
//                 return;
//             }

//             if (data?.completed === true) {
//                 setIsFinished(true);
//             }
//         } catch (err) {
//             console.error("❌ Next Question Error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* ---------------- FINISHED SCREEN ---------------- */
//     if (isFinished) {
//         return (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//                 <div className="bg-white rounded-2xl p-10 text-center">
//                     <h2 className="text-2xl font-semibold mb-4">
//                         ✅ Setup Completed
//                     </h2>
//                     <button
//                         onClick={onClose}
//                         className="mt-4 px-6 py-2 border rounded-full hover:bg-black hover:text-white transition"
//                     >
//                         Go to Workspace
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div
//             className="fixed inset-0 z-50 flex flex-col"
//             style={{
//                 backgroundImage: `url(${isDark ? bgDark : bgLight})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//             }}
//         >
//             <Header />

//             {/* GRID */}
//             <div
//                 className="absolute inset-0 pointer-events-none
//                 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),
//                 linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]
//                 bg-[size:40px_40px]"
//             />

//             <div className="relative z-10 flex flex-1 items-center justify-center px-6">
//                 <div
//                     className={`w-full max-w-5xl rounded-[28px] p-12 border backdrop-blur-xl
//                     shadow-[0_40px_100px_rgba(0,0,0,0.25)]
//                     ${isDark
//                         ? "bg-black/70 border-white/10 text-white"
//                         : "bg-white border-gray-300 text-black"
//                     }`}
//                 >
//                     {/* TOP */}
//                     <div className="flex justify-between text-xs mb-6 opacity-70">
//                         <span>INITIALIZING ENGINE......</span>
//                         <span>STEP</span>
//                     </div>

//                     <div className={`h-px mb-10 ${isDark ? "bg-white/10" : "bg-gray-300"}`} />

//                     {/* QUESTION */}
//                     <div className="text-center mb-12">
//                         <h2 className="text-2xl font-semibold mb-2">
//                             {question.question}
//                         </h2>
//                         {question._topic_label && (
//                             <p className="text-sm opacity-70">
//                                 {question._topic_label}
//                             </p>
//                         )}
//                     </div>

//                     {/* ---------------- OPTION QUESTIONS ---------------- */}
//                     {isOptionType && (
//                         <div className="grid md:grid-cols-3 gap-10 mb-16">
//                             {optionList.map((opt, i) => {
//                                 const value = typeof opt === "object" ? opt.value : opt;
//                                 const label = typeof opt === "object" ? opt.label : opt;

//                                 return (
//                                     <div
//                                         key={i}
//                                         onClick={() => setSelected(value)}
//                                         className={`rounded-2xl p-8 text-center cursor-pointer border transition
//                                             ${selected === value
//                                                 ? isDark
//                                                     ? "border-white bg-white/10"
//                                                     : "border-black shadow-md"
//                                                 : isDark
//                                                     ? "border-white/10 hover:bg-white/5"
//                                                     : "border-gray-300 hover:bg-gray-50"
//                                             }`}
//                                     >
//                                         <h3 className="font-medium">{label}</h3>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {/* ---------------- TEXT ---------------- */}
//                     {questionType === "text" && (
//                         <textarea
//                             rows="6"
//                             value={textAnswer}
//                             onChange={(e) => setTextAnswer(e.target.value)}
//                             placeholder="Type your answer here..."
//                             className={`w-full rounded-xl border px-5 py-4 mb-16 resize-none bg-transparent outline-none
//                                 ${isDark ? "border-white/10" : "border-gray-300"}`}
//                         />
//                     )}

//                     {/* ---------------- YES / NO ---------------- */}
//                     {questionType === "yesno" && (
//                         <div className="flex justify-center gap-8 mb-16">
//                             {["Yes", "No"].map((val) => (
//                                 <button
//                                     key={val}
//                                     onClick={() => setSelected(val)}
//                                     className={`px-12 py-4 rounded-2xl text-lg font-medium border transition
//                                         ${selected === val
//                                             ? isDark
//                                                 ? "bg-white text-black border-white"
//                                                 : "bg-black text-white border-black"
//                                             : isDark
//                                                 ? "border-white/10 hover:bg-white/5"
//                                                 : "border-gray-300 hover:bg-gray-50"
//                                         }`}
//                                 >
//                                     {val}
//                                 </button>
//                             ))}
//                         </div>
//                     )}

//                     {/* ---------------- SPECIAL TYPES ---------------- */}
//                     {["color-matrix", "modules-selection"].includes(questionType) && (
//                         <ColorSelection
//                             stepType={questionType}
//                             options={question.options}
//                             isDark={isDark}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />
//                     )}

//                     {/* FOOTER */}
//                     <div className="flex justify-end">
//                         <button
//                             disabled={
//                                 loading ||
//                                 (questionType === "text" && !textAnswer) ||
//                                 (questionType !== "text" && !selected)
//                             }
//                             onClick={handleContinue}
//                             className={`px-10 py-2.5 rounded-full border transition
//                                 ${selected || textAnswer
//                                     ? isDark
//                                         ? "border-white hover:bg-white hover:text-black"
//                                         : "border-black hover:bg-black hover:text-white"
//                                     : "opacity-40 cursor-not-allowed border-gray-400"
//                                 }`}
//                         >
//                             {loading ? "Loading..." : "Continue"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GoalStepModal;


















// import React, { useContext, useState } from "react";
// import { ThemeContext } from "../../ThemeProvider.jsx";
// import Header from "./Header.jsx";
// import Cookies from "js-cookie";

// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";
// import { useNavigate } from "react-router-dom";

// /* ---------------- CONFIG ---------------- */
// const SINGLE_OPTION_TYPES = ["radio", "select", "dropdown", "optional"];

// const MULTI_OPTION_TYPES = ["checkbox"];

// const GoalStepModal = ({ firstQuestion, onComplete }) => {
//     const navigate = useNavigate();
//     const { theme } = useContext(ThemeContext);
//     const isDark = theme === "dark";

//     const [question, setQuestion] = useState(firstQuestion);
//     const [selected, setSelected] = useState(null);
//     const [multiSelected, setMultiSelected] = useState([]);
//     const [textAnswer, setTextAnswer] = useState("");
//     const [loading, setLoading] = useState(false);

//     if (!question) return null;

//     const questionType = question?.type?.toLowerCase();
//     const optionList = question?.options || question?.optional?.options || [];

//     /* ---------------- HELPERS ---------------- */
//     const toggleCheckbox = (value) => {
//         setMultiSelected((prev) =>
//             prev.includes(value)
//                 ? prev.filter((v) => v !== value)
//                 : [...prev, value]
//         );
//     };

//     /* ---------------- CONTINUE ---------------- */
//     const handleContinue = async () => {
//         let answer = null;

//         if (questionType === "checkbox") {
//             answer = multiSelected.join(", "); // ✅ ARRAY → STRING
//         } else if (["text", "textarea", "number", "date"].includes(questionType)) {
//             answer = textAnswer;
//         } else {
//             answer = selected;
//         }

//         if (!answer || answer.length === 0) return;

//         setLoading(true);

//         try {
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${Cookies.get("access_token")}`,
//                     },
//                     body: JSON.stringify({
//                         session_id: Cookies.get("session_id"),
//                         question_id: question.id,
//                         answer, // ✅ always string now
//                     }),
//                 }
//             );

//             const data = await res.json();
//             console.log("⬅️ Next Question:", data);

//             if (data?.next_question?.id) {
//                 setQuestion(data.next_question);
//                 setSelected(null);
//                 setMultiSelected([]);
//                 setTextAnswer("");
//                 return;
//             }

//             if (data?.completed) {
//                 onComplete(); // 🔥 parent controls next step
//                 return;
//             }


//         } catch (err) {
//             console.error("❌ Next Question Error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <div
//                 className="fixed inset-0 z-50 flex flex-col"
//                 style={{
//                     backgroundImage: `url(${isDark ? bgDark : bgLight})`,
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                 }}
//             >
//                 <Header />

//                 <div className="relative z-10 flex flex-1 items-center justify-center px-6">
//                     <div
//                         className={`w-full max-w-5xl rounded-[28px] p-12 border backdrop-blur-xl
//                     ${isDark
//                                 ? "bg-black/70 border-white/10 text-white"
//                                 : "bg-white border-gray-300 text-black"
//                             }`}
//                     >
//                         {/* QUESTION */}
//                         <div className="text-center mb-12">
//                             <h2 className="text-2xl font-semibold mb-2">
//                                 {question.question}
//                             </h2>
//                             {question._topic_label && (
//                                 <p className="text-sm opacity-70">
//                                     {question._topic_label}
//                                 </p>
//                             )}
//                         </div>

//                         {/* ---------------- RADIO / SELECT ---------------- */}
//                         {SINGLE_OPTION_TYPES.includes(questionType) && (
//                             <div className="grid md:grid-cols-3 gap-8 mb-16">
//                                 {optionList.map((opt, i) => {
//                                     const value = opt.value || opt;
//                                     const label = opt.label || opt;

//                                     return (
//                                         <div
//                                             key={i}
//                                             onClick={() => setSelected(value)}
//                                             className={`p-6 rounded-2xl text-center cursor-pointer border transition
//                         ${selected === value
//                                                     ? "border-black shadow-md"
//                                                     : "border-gray-300 hover:bg-gray-50"
//                                                 }`}
//                                         >
//                                             {label}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}


//                         {/* ---------------- CHECKBOX ---------------- */}
//                         {questionType === "checkbox" && (
//                             <div className="grid md:grid-cols-2 gap-6 mb-16">
//                                 {optionList.map((opt, i) => {
//                                     const value = opt.value || opt;
//                                     const label = opt.label || opt;
//                                     const checked = multiSelected.includes(value);

//                                     return (
//                                         <label
//                                             key={i}
//                                             className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer
//                                             ${checked ? "border-black bg-gray-100" : "border-gray-300"}
//                                         `}
//                                         >
//                                             <input
//                                                 type="checkbox"
//                                                 checked={checked}
//                                                 onChange={() => toggleCheckbox(value)}
//                                             />
//                                             {label}
//                                         </label>
//                                     );
//                                 })}
//                             </div>
//                         )}

//                         {/* ---------------- INPUT TYPES ---------------- */}
//                         {["text", "number", "date"].includes(questionType) && (
//                             <input
//                                 type={questionType}
//                                 value={textAnswer}
//                                 onChange={(e) => setTextAnswer(e.target.value)}
//                                 className="w-full border rounded-xl px-5 py-4 mb-16"
//                             />
//                         )}

//                         {/* ---------------- TEXTAREA ---------------- */}
//                         {questionType === "textarea" && (
//                             <textarea
//                                 rows="6"
//                                 value={textAnswer}
//                                 onChange={(e) => setTextAnswer(e.target.value)}
//                                 className="w-full border rounded-xl px-5 py-4 mb-16 resize-none"
//                             />
//                         )}

//                         {/* ---------------- YES / NO ---------------- */}
//                         {questionType === "yesno" && (
//                             <div className="flex justify-center gap-8 mb-16">
//                                 {["Yes", "No"].map((val) => (
//                                     <button
//                                         key={val}
//                                         onClick={() => setSelected(val)}
//                                         className={`px-10 py-4 rounded-xl border
//                                         ${selected === val
//                                                 ? "bg-black text-white"
//                                                 : "border-gray-300"
//                                             }`}
//                                     >
//                                         {val}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}

//                         {/* ---------------- SPECIAL ---------------- */}
//                         {["color-matrix", "modules-selection"].includes(questionType) && (
//                             <ColorSelection
//                                 stepType={questionType}
//                                 options={question.options}
//                                 selected={selected}
//                                 setSelected={setSelected}
//                                 isDark={isDark}
//                             />
//                         )}

//                         {/* FOOTER */}
//                         <div className="flex justify-end">
//                             <button
//                                 disabled={loading}
//                                 onClick={handleContinue}
//                                 className="px-10 py-3 rounded-full border hover:bg-black hover:text-white transition"
//                             >
//                                 {loading ? "Loading..." : "Continue"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {step === STEPS.COLORS && (
//                 <div className="relative z-10 flex flex-1 items-center justify-center px-6">
//                     <div className="w-full max-w-5xl rounded-[28px] p-12 border backdrop-blur-xl">

//                         <div className="text-center mb-12">
//                             <h2 className="text-2xl font-semibold">
//                                 તમારી વેબસાઇટ માટે રંગો પસંદ કરો
//                             </h2>
//                             <p className="text-sm opacity-70">
//                                 તમે પછીથી પણ બદલી શકો છો
//                             </p>
//                         </div>

//                         <ColorSelection
//                             isDark={isDark}
//                             selected={selected}
//                             setSelected={setSelected}
//                         />

//                         <div className="flex justify-end">
//                             <button
//                                 className="px-10 py-3 rounded-full border hover:bg-black hover:text-white"
//                             >
//                                 Finish
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             )}

//             <div className="absolute bottom-4 right-4">
//                 <button
//                     onClick={() => setStep(STEPS.QUESTIONS)}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//                 >
//                     Back to Questions
//                 </button>
//             </div>
//         </>
//     );
// };

// export default GoalStepModal;












// import React, { useContext, useState } from "react";
// import { ThemeContext } from "../../ThemeProvider.jsx";
// import Header from "./Header.jsx";
// import Cookies from "js-cookie";
// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";

// const SINGLE_OPTION_TYPES = ["radio", "select", "dropdown", "optional"];

// const GoalStepModal = ({ firstQuestion, onComplete }) => {
//     const { theme } = useContext(ThemeContext);
//     const isDark = theme === "dark";

//     const [question, setQuestion] = useState(firstQuestion);
//     const [selected, setSelected] = useState(null);
//     const [multiSelected, setMultiSelected] = useState([]);
//     const [textAnswer, setTextAnswer] = useState("");
//     const [loading, setLoading] = useState(false);

//     if (!question) return null;

//     const rawType = question?.type?.toLowerCase();

//     const inferredType = question?.options || question?.optional?.options
//         ? "radio"
//         : ["text", "textarea", "number", "date"].includes(rawType)
//             ? rawType
//             : null;

//     const questionType = rawType || inferredType;

//     const optionList = question?.options || question?.optional?.options || [];

//     const toggleCheckbox = (value) => {
//         setMultiSelected((prev) =>
//             prev.includes(value)
//                 ? prev.filter((v) => v !== value)
//                 : [...prev, value]
//         );
//     };

//     const handleContinue = async () => {
//         let answer = null;

//         if (questionType === "checkbox") {
//             answer = multiSelected.join(", ");
//         } else if (["text", "textarea", "number", "date"].includes(questionType)) {
//             answer = textAnswer;
//         } else {
//             answer = selected;
//         }

//         if (!answer) return;

//         setLoading(true);

//         try {
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${Cookies.get("access_token")}`,
//                     },
//                     body: JSON.stringify({
//                         session_id: Cookies.get("session_id"),
//                         question_id: question.id,
//                         answer,
//                     }),
//                 }
//             );

//             const data = await res.json();
//             console.log("⬅️ Next Question:", data);

//             if (data?.next_question?.id) {
//                 setQuestion(data.next_question);
//                 setSelected(null);
//                 setMultiSelected([]);
//                 setTextAnswer("");
//                 return;
//             }

//             if (data?.completed) {
//                 onComplete();
//             }
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div
//             className="fixed inset-0 z-50 flex flex-col"
//             style={{
//                 backgroundImage: `url(${isDark ? bgDark : bgLight})`,
//                 backgroundSize: "cover",
//             }}
//         >
//             <Header />

//             <div className="flex-1 flex items-center justify-center px-6">
//                 <div
//                     className={`w-full max-w-5xl p-12 rounded-[28px] border backdrop-blur-xl
//                     ${isDark ? "bg-black/70 border-white/10 text-white" : "bg-white border-gray-300"}`}
//                 >
//                     <div className="text-center mb-12">
//                         <h2 className="text-2xl font-semibold">
//                             {question.question}
//                         </h2>
//                     </div>

//                     {SINGLE_OPTION_TYPES.includes(questionType) && (
//                         <div className="grid md:grid-cols-3 gap-8 mb-16">
//                             {optionList.map((opt, i) => {
//                                 const value = opt.value || opt;
//                                 return (
//                                     <div
//                                         key={i}
//                                         onClick={() => setSelected(value)}
//                                         className={`p-6 rounded-2xl cursor-pointer border text-center
//                                         ${selected === value
//                                                 ? "border-black shadow-md"
//                                                 : "border-gray-300 hover:bg-gray-50"}`}
//                                     >
//                                         {opt.label || opt}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {questionType === "checkbox" && (
//                         <div className="grid md:grid-cols-2 gap-6 mb-16">
//                             {optionList.map((opt, i) => {
//                                 const value = opt.value || opt;
//                                 const checked = multiSelected.includes(value);
//                                 return (
//                                     <label
//                                         key={i}
//                                         className={`flex gap-4 p-4 border rounded-xl cursor-pointer
//                                         ${checked ? "border-black bg-gray-100" : "border-gray-300"}`}
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             checked={checked}
//                                             onChange={() => toggleCheckbox(value)}
//                                         />
//                                         {opt.label || opt}
//                                     </label>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {["text", "number", "date"].includes(questionType) && (
//                         <input
//                             type={questionType}
//                             value={textAnswer}
//                             onChange={(e) => setTextAnswer(e.target.value)}
//                             className="w-full border rounded-xl px-5 py-4 mb-16"
//                         />
//                     )}

//                     {questionType === "textarea" && (
//                         <textarea
//                             rows="6"
//                             value={textAnswer}
//                             onChange={(e) => setTextAnswer(e.target.value)}
//                             className="w-full border rounded-xl px-5 py-4 mb-16 resize-none"
//                         />
//                     )}

//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleContinue}
//                             disabled={loading}
//                             className="px-10 py-3 rounded-full border hover:bg-black hover:text-white"
//                         >
//                             {loading ? "Loading..." : "Continue"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GoalStepModal;

























// import React, { useContext, useState, useEffect } from "react";
// import { ThemeContext } from "../../ThemeProvider.jsx";
// import Header from "./Header.jsx";
// import Cookies from "js-cookie";
// import bgLight from "../../../Public/bg.png";
// import bgDark from "../../../Public/bg_black.png";

// const SINGLE_OPTION_TYPES = ["radio", "select", "dropdown", "optional"];

// /* 🔒 BULLET-PROOF QUESTION TYPE RESOLVER */
// const resolveQuestionType = (q) => {
//     if (!q) return null;

//     // 1️⃣ Explicit backend type
//     if (q.type) return q.type.toLowerCase();

//     // 2️⃣ Infer from options
//     const opts = q.options || q.optional?.options;
//     if (Array.isArray(opts) && opts.length > 0) {
//         return "radio";
//     }

//     // 3️⃣ Safe fallback
//     return "radio";
// };  

// const GoalStepModal = ({ firstQuestion, onComplete }) => {
//     const { theme } = useContext(ThemeContext);
//     const isDark = theme === "dark";

//     const [question, setQuestion] = useState(firstQuestion);
//     const [selected, setSelected] = useState(null);
//     const [multiSelected, setMultiSelected] = useState([]);
//     const [textAnswer, setTextAnswer] = useState("");
//     const [loading, setLoading] = useState(false);

//     if (!question) return null;

//     const questionType = resolveQuestionType(question);
//     const optionList = question?.options || question?.optional?.options || [];

//     /* 🧠 AUTO-SELECT FIRST OPTION IF TYPE MISSING */
//     useEffect(() => {
//         if (
//             !selected &&
//             questionType === "radio" &&
//             optionList.length > 0
//         ) {
//             const firstValue = optionList[0].value || optionList[0];
//             setSelected(firstValue);
//         }
//     }, [questionType, optionList]);

//     /* 🐞 DEBUG LOG */
//     useEffect(() => {
//         if (!question?.type) {
//             console.warn("⚠️ Type missing, inferred:", {
//                 questionId: question?.id,
//                 inferredType: questionType,
//             });
//         }
//     }, [question]);

//     const toggleCheckbox = (value) => {
//         setMultiSelected((prev) =>
//             prev.includes(value)
//                 ? prev.filter((v) => v !== value)
//                 : [...prev, value]
//         );
//     };

//     const handleContinue = async () => {
//         let answer = null;

//         if (questionType === "checkbox") {
//             answer = multiSelected.join(", ");
//         } else if (["text", "textarea", "number", "date"].includes(questionType)) {
//             answer = textAnswer;
//         } else {
//             answer = selected;
//         }

//         if (!answer) return;

//         setLoading(true);

//         try {
//             const res = await fetch(
//                 `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${Cookies.get("access_token")}`,
//                     },
//                     body: JSON.stringify({
//                         session_id: Cookies.get("session_id"),
//                         question_id: question.id,
//                         answer,
//                     }),
//                 }
//             );

//             const data = await res.json();
//             console.log("⬅️ Next Question:", data);

//             if (data?.next_question?.id) {
//                 setQuestion(data.next_question);
//                 setSelected(null);
//                 setMultiSelected([]);
//                 setTextAnswer("");
//                 return;
//             }

//             if (data?.completed) {
//                 onComplete();
//             }
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* 🚑 FAIL-SAFE UI */
//     if (!questionType) {
//         return (
//             <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
//                 Loading question...
//             </div>
//         );
//     }

//     const isValidAnswer =
//         questionType === "checkbox"
//             ? multiSelected.length > 0
//             : ["text", "textarea"].includes(questionType)
//                 ? textAnswer.trim()
//                 : selected;

//     return (
//         <div
//             className="fixed inset-0 z-50 flex flex-col"
//             style={{
//                 backgroundImage: `url(${isDark ? bgDark : bgLight})`,
//                 backgroundSize: "cover",
//             }}
//         >
//             <Header />

//             <div className="flex-1 flex items-center justify-center px-6">
//                 <div
//                     className={`w-full max-w-5xl p-12 rounded-[28px] border backdrop-blur-xl
//                     ${isDark ? "bg-black/70 border-white/10 text-white" : "bg-white border-gray-300"}`}
//                 >
//                     <div className="text-center mb-12">
//                         <h2 className="text-2xl font-semibold">
//                             {question.question}
//                         </h2>
//                     </div>

//                     {SINGLE_OPTION_TYPES.includes(questionType) && (
//                         <div className="grid md:grid-cols-3 gap-8 mb-16">
//                             {optionList.map((opt, i) => {
//                                 const value = opt.value || opt;
//                                 return (
//                                     <div
//                                         key={i}
//                                         onClick={() => setSelected(value)}
//                                         className={`p-6 rounded-2xl cursor-pointer border text-center
//                                         ${selected === value
//                                                 ? "border-black shadow-md"
//                                                 : "border-gray-300 hover:bg-gray-50"}`}
//                                     >
//                                         {opt.label || opt}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {questionType === "checkbox" && (
//                         <div className="grid md:grid-cols-2 gap-6 mb-16">
//                             {optionList.map((opt, i) => {
//                                 const value = opt.value || opt;
//                                 const checked = multiSelected.includes(value);
//                                 return (
//                                     <label
//                                         key={i}
//                                         className={`flex gap-4 p-4 border rounded-xl cursor-pointer
//                                         ${checked ? "border-black bg-gray-100" : "border-gray-300"}`}
//                                     >
//                                         <input
//                                             type="checkbox"
//                                             checked={checked}
//                                             onChange={() => toggleCheckbox(value)}
//                                         />
//                                         {opt.label || opt}
//                                     </label>
//                                 );
//                             })}
//                         </div>
//                     )}

//                     {["text", "number", "date"].includes(questionType) && (
//                         <input
//                             type={questionType}
//                             value={textAnswer}
//                             onChange={(e) => setTextAnswer(e.target.value)}
//                             className="w-full border rounded-xl px-5 py-4 mb-16"
//                         />
//                     )}

//                     {questionType === "textarea" && (
//                         <textarea
//                             rows="6"
//                             value={textAnswer}
//                             onChange={(e) => setTextAnswer(e.target.value)}
//                             className="w-full border rounded-xl px-5 py-4 mb-16 resize-none"
//                         />
//                     )}

//                     <div className="flex justify-end">
//                         <button
//                             onClick={handleContinue}
//                             disabled={!isValidAnswer || loading}
//                             className="px-10 py-3 rounded-full border hover:bg-black hover:text-white disabled:opacity-50"
//                         >
//                             {loading ? "Loading..." : "Continue"}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GoalStepModal;












import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import Header from "./Header.jsx";
import Cookies from "js-cookie";
import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";

const SINGLE_OPTION_TYPES = ["radio", "select", "dropdown", "optional"];

/* 🔒 BULLET-PROOF QUESTION TYPE RESOLVER */
const resolveQuestionType = (q) => {
    if (!q) return null;

    let type = q.type?.toLowerCase();

    // 🔥 NORMALIZE BACKEND TYPES
    if (type === "required") type = "radio";
    if (type === "single") type = "radio";

    // Explicit type
    if (type) return type;

    // Infer from options
    const opts = q.options || q.optional?.options;
    if (Array.isArray(opts) && opts.length > 0) {
        return "radio";
    }

    return "radio";
};

const GoalStepModal = ({ firstQuestion, onComplete }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    /* 🔒 LOCK SESSION ID ONCE (ROOT BUG FIX) */
    const [sessionId] = useState(() => Cookies.get("session_id"));

    const [question, setQuestion] = useState(firstQuestion);
    const [selected, setSelected] = useState(null);
    const [multiSelected, setMultiSelected] = useState([]);
    const [textAnswer, setTextAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    if (!question) return null;

    const questionType = resolveQuestionType(question);
    const optionList = question?.options || question?.optional?.options || [];

    /* 🧠 AUTO-SELECT FIRST OPTION (RADIO SAFETY) */
    useEffect(() => {
        if (
            questionType === "radio" &&
            optionList.length > 0 &&
            selected === null
        ) {
            const firstValue = optionList[0]?.value || optionList[0];
            setSelected(firstValue);
        }
    }, [questionType, optionList]);

    /* 🐞 DEV-ONLY DEBUG (OPTIONAL) */
    useEffect(() => {
        if (import.meta.env.DEV && !question?.type) {
            console.warn("⚠️ Backend skipped type, inferred safely:", {
                questionId: question?.id,
                inferredType: questionType,
            });
        }
    }, [question]);

    const toggleCheckbox = (value) => {
        setMultiSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    const handleContinue = async () => {
        if (!sessionId) {
            console.error("❌ session_id missing — stopping request");
            return;
        }

        let answer = null;

        if (questionType === "checkbox") {
            answer = multiSelected.join(", ");
        } else if (["text", "textarea", "number", "date"].includes(questionType)) {
            answer = textAnswer.trim();
        } else {
            answer = selected;
        }

        if (!answer) return;

        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/recommendation/next-question`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                    body: JSON.stringify({
                        session_id: sessionId, // 🔒 STABLE
                        question_id: question.id,
                        answer,
                    }),
                }
            );

            const data = await res.json();
            console.log("⬅️ Next Question:", data);

            if (data?.next_question?.id) {
                setQuestion(data.next_question);
                setSelected(null);
                setMultiSelected([]);
                setTextAnswer("");
                return;
            }

            if (data?.completed) {
                onComplete();
            }
        } catch (err) {
            console.error("❌ Next question error:", err);
        } finally {
            setLoading(false);
        }
    };

    /* 🚑 HARD FAIL-SAFE */
    if (!questionType) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
                Loading question…
            </div>
        );
    }

    const isValidAnswer =
        questionType === "checkbox"
            ? multiSelected.length > 0
            : ["text", "textarea"].includes(questionType)
                ? textAnswer.trim()
                : selected !== null;

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col"
            style={{
                backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                backgroundSize: "cover",
            }}
        >
            <Header />

            <div className="flex-1 flex items-center justify-center px-6">
                <div
                    className={`w-full max-w-5xl p-12 rounded-[28px] border backdrop-blur-xl
                    ${isDark
                            ? "bg-black/70 border-white/10 text-white"
                            : "bg-white border-gray-300"
                        }`}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold">
                            {question.question}
                        </h2>
                    </div>

                    {SINGLE_OPTION_TYPES.includes(questionType) && (
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {optionList.map((opt, i) => {
                                const value = opt.value || opt;
                                return (
                                    <div
                                        key={i}
                                        onClick={() => setSelected(value)}
                                        className={`p-6 rounded-2xl cursor-pointer border text-center
                                        ${selected === value
                                                ? "border-black shadow-md"
                                                : "border-gray-300 hover:bg-gray-50"
                                            }`}
                                    >
                                        {opt.label || opt}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {questionType === "checkbox" && (
                        <div className="grid md:grid-cols-2 gap-6 mb-16">
                            {optionList.map((opt, i) => {
                                const value = opt.value || opt;
                                const checked = multiSelected.includes(value);
                                return (
                                    <label
                                        key={i}
                                        className={`flex gap-4 p-4 border rounded-xl cursor-pointer
                                        ${checked
                                                ? "border-black bg-gray-100"
                                                : "border-gray-300"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleCheckbox(value)}
                                        />
                                        {opt.label || opt}
                                    </label>
                                );
                            })}
                        </div>
                    )}

                    {["text", "number", "date"].includes(questionType) && (
                        <input
                            type={questionType}
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 mb-16"
                        />
                    )}

                    {questionType === "textarea" && (
                        <textarea
                            rows="6"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            className="w-full border rounded-xl px-5 py-4 mb-16 resize-none"
                        />
                    )}

                    <div className="flex justify-end">
                        <button
                            onClick={handleContinue}
                            disabled={!isValidAnswer || loading}
                            className="px-10 py-3 rounded-full border hover:bg-black hover:text-white disabled:opacity-50"
                        >
                            {loading ? "Loading…" : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalStepModal;
