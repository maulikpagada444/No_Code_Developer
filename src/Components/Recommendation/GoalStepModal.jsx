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
