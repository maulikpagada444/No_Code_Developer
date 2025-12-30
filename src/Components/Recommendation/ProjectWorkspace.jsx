import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeProvider.jsx";
import { useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import GoalStepModal from "./GoalStepModal.jsx";
import AppAlert from "../common/AppAlert.jsx";
import ColorSelection from "./ColorSelection.jsx";
import FeaturesSelection, { MODULES_OPTIONS } from "./FeaturesSelection.jsx";

import bgLight from "../../../Public/bg.png";
import bgDark from "../../../Public/bg_black.png";
import Cookies from "js-cookie";

/* ---------------- STEPS ---------------- */
const STEPS = {
    PROMPT: "prompt",
    QUESTIONS: "questions",
    COLORS: "colors",
    FEATURES: "features", // 👈 ADD
};


const ProjectWorkspace = () => {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const isDark = theme === "dark";

    const [step, setStep] = useState(STEPS.PROMPT);
    const [language, setLanguage] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedPalette, setSelectedPalette] = useState(null); // 👈 IMPORTANT
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [featuresOptions, setFeaturesOptions] = useState(MODULES_OPTIONS);
    const [featuresLoading, setFeaturesLoading] = useState(false);
    const [featuresError, setFeaturesError] = useState("");
    const [savingFeatures, setSavingFeatures] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success",
        title: "",
    });

    const showAlert = (message, severity = "error", title = "") => {
        setAlert({ open: true, message, severity, title });
    };

    /* ---------------- GENERATE ---------------- */
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleGenerate = async () => {
        if (!prompt.trim() || loading) return;

        try {
            setLoading(true);

            const response = await fetch(
                `${BASE_URL}/recommendation/generated_question`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
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

            if (data.session_id) {
                Cookies.set("session_id", data.session_id);
            }

            if (data.questions?.length) {
                setFirstQuestion(data.questions[0]);
                setStep(STEPS.QUESTIONS);
            } else {
                showAlert("No questions generated", "warning");
            }
        } catch (err) {
            console.error(err);
            showAlert(err.message || "Server error", "error", "Generation Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleFinishPalette = async () => {
        if (selectedPalette === null) {
            showAlert("Please select a color palette", "warning");
            return;
        }

        const payload =
            selectedPalette === "custom"
                ? {
                    session_id: Cookies.get("session_id"),
                    palette_type: "custom",
                    colors: customColors,
                }
                : {
                    session_id: Cookies.get("session_id"),
                    palette_id: `p${selectedPalette + 1}`,
                };

        try {
            const res = await fetch(
                `${BASE_URL}/recommendation/select-palette`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const data = await res.json();
            if (!res.ok || data.status === false) {
                throw new Error(data?.message || "Palette selection failed");
            }

            setStep(STEPS.FEATURES);
        } catch (err) {
            showAlert(err.message, "error", "Palette Error");
        }
    };

    const normalizeFeatureOption = (item, index) => {
        if (!item) return null;

        if (typeof item === "string") {
            return {
                value: item,
                label: item
                    .split(/[_-\s]/)
                    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
                    .join(" "),
            };
        }

        if (typeof item === "object") {
            const value = item.value || item.slug || item.id || item.label || `feature_${index}`;
            const label =
                item.label ||
                value
                    .split(/[_-\s]/)
                    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
                    .join(" ");

            return {
                ...item,
                value,
                label,
            };
        }

        return null;
    };

    const fetchFeatureOptions = async () => {
        if (featuresLoading) return;

        const sessionId = Cookies.get("session_id");
        if (!sessionId) {
            setFeaturesError("Session expired. Restart flow.");
            return;
        }

        try {
            setFeaturesLoading(true);
            setFeaturesError("");

            const res = await fetch(`${BASE_URL}/recommendation/features`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
                body: JSON.stringify({ session_id: sessionId }),
            });

            const data = await res.json();

            if (!res.ok || data.status === false) {
                throw new Error(data?.message || "Failed to fetch features");
            }

            const rawFeatures = data?.features || data?.data?.features || [];
            const nextOptions = rawFeatures
                .map((feature, index) => normalizeFeatureOption(feature, index))
                .filter(Boolean);

            setFeaturesOptions(nextOptions.length ? nextOptions : MODULES_OPTIONS);
            if (!nextOptions.length) {
                showAlert("Using default modules due to empty server response.", "warning");
            }
        } catch (err) {
            console.error(err);
            setFeaturesError(err.message || "Failed to fetch features");
        } finally {
            setFeaturesLoading(false);
        }
    };

    useEffect(() => {
        if (step === STEPS.FEATURES) {
            fetchFeatureOptions();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    const handleFinishFeatures = async () => {
        if (!selectedFeatures.length || savingFeatures) {
            showAlert("Please select at least one module", "warning");
            return;
        }

        const sessionId = Cookies.get("session_id");
        const projectId = Cookies.get("project_id");

        if (!sessionId) {
            showAlert("Session expired. Restart flow.", "warning");
            return;
        }

        if (!projectId) {
            showAlert("Project not found. Create a project first.", "warning");
            return;
        }

        try {
            setSavingFeatures(true);

            const selectRes = await fetch(`${BASE_URL}/recommendation/select_features`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    selected_features: selectedFeatures,
                }),
            });

            const selectData = await selectRes.json();

            if (!selectRes.ok || selectData.status === false) {
                throw new Error(selectData?.message || "Failed to save selected features");
            }

            const metaRes = await fetch(`${BASE_URL}/recommendation/save_metadata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    project_id: Number(projectId),
                }),
            });

            const metaData = await metaRes.json();

            if (!metaRes.ok || metaData.status === false) {
                throw new Error(metaData?.message || "Failed to save project metadata");
            }

            navigate("/project/preview");
        } catch (err) {
            console.error(err);
            showAlert(err.message || "Failed to finish setup", "error", "Finish Failed");
        } finally {
            setSavingFeatures(false);
        }
    };

    return (
        <>
            <div
                className="min-h-screen relative overflow-hidden flex flex-col"
                style={{
                    backgroundImage: `url(${isDark ? bgDark : bgLight})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Header />

                {step === STEPS.PROMPT && (
                    <>
                        <div className="absolute top-[92px] right-6 z-30">
                            <LanguageSelector
                                theme={theme}
                                value={language}
                                onChange={setLanguage}
                            />
                        </div>

                        <main className="flex-1 flex flex-col items-center justify-center px-6">
                            <div className="w-full max-w-2xl">
                                <div
                                    className={`flex gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl
                                    ${isDark
                                            ? "bg-white/5 border-white/10 text-white"
                                            : "bg-white border-gray-300 text-black"
                                        }`}
                                >
                                    <input
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder='Example: "Explain quantum computing"'
                                        className="flex-1 bg-transparent outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleGenerate();
                                        }}
                                    />

                                    <button
                                        onClick={handleGenerate}
                                        disabled={loading}
                                        className="px-6 py-2 rounded-full bg-black text-white"
                                    >
                                        {loading ? "Generating..." : "Send"}
                                    </button>
                                </div>
                            </div>
                        </main>
                    </>
                )}

                {step === STEPS.QUESTIONS && (
                    <GoalStepModal
                        firstQuestion={firstQuestion}
                        onComplete={() => setStep(STEPS.COLORS)}
                    />
                )}

                {step === STEPS.COLORS && (
                    <div className="flex-1 flex items-center justify-center px-6">
                        <div
                            className={`w-full max-w-5xl p-12 rounded-[28px] border backdrop-blur-xl
                            ${isDark ? "bg-black/70 border-white/10 text-white" : "bg-white border-gray-300"}`}
                        >
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-semibold">
                                    તમારી વેબસાઇટ માટે રંગો પસંદ કરો
                                </h2>
                                <p className="text-sm opacity-70">
                                    તમે પછીથી પણ બદલી શકો છો
                                </p>
                            </div>

                            <ColorSelection
                                isDark={isDark}
                                selected={selectedPalette}
                                setSelected={setSelectedPalette}
                            />


                            <div className="flex justify-end">
                                <button
                                    onClick={handleFinishPalette}
                                    disabled={selectedPalette === null}
                                    className="px-10 py-3 rounded-full border hover:bg-black hover:text-white disabled:opacity-40"
                                >
                                    Finish
                                </button>

                            </div>
                        </div>
                    </div>
                )}

                {step === STEPS.FEATURES && (
                    <div className="flex-1 flex items-center justify-center px-6">
                        <div
                            className={`w-full max-w-5xl p-12 rounded-[28px] border backdrop-blur-xl
                            ${isDark ? "bg-black/70 border-white/10 text-white" : "bg-white border-gray-300"}`}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-semibold">Choose your website modules</h2>
                                <p className="text-sm opacity-70">Pick up to 4 sections to include.</p>
                            </div>

                            {featuresLoading ? (
                                <div className="text-center py-16 opacity-70">Fetching modules…</div>
                            ) : featuresError ? (
                                <div className="text-center py-12 space-y-4">
                                    <p className="text-red-500 text-sm">{featuresError}</p>
                                    <button
                                        onClick={fetchFeatureOptions}
                                        className="px-6 py-2 rounded-full border hover:bg-black hover:text-white"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : (
                                <FeaturesSelection
                                    isDark={isDark}
                                    selected={selectedFeatures}
                                    setSelected={setSelectedFeatures}
                                    options={featuresOptions}
                                />
                            )}

                            <div className="flex justify-end">
                                <button
                                    onClick={handleFinishFeatures}
                                    disabled={!selectedFeatures.length || savingFeatures}
                                    className="px-10 py-3 rounded-full border hover:bg-black hover:text-white disabled:opacity-40"
                                >
                                    {savingFeatures ? "Saving..." : "Finish"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <AppAlert
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
                title={alert.title}
                onClose={() => setAlert((p) => ({ ...p, open: false }))}
            />
        </>
    );
};

export default ProjectWorkspace;
