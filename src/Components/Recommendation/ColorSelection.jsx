import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FiPlus } from "react-icons/fi";

export const COLOR_MATRIX_OPTIONS = [
    ["#D9ED92", "#B5E48C", "#99D98C", "#76C893", "#52B69A"],
    ["#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"],
    ["#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD", "#D4A373"],
    ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"],
    ["#264653", "#2A9D8F", "#E9C46A", "#F4A261", "#E76F51"],
    ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"],
    ["#8E9AAF", "#CBC0D3", "#EFD3D7", "#FEEAFA", "#DEE2FF"],
    ["#000000", "#14213D", "#FCA311", "#E5E5E5", "#FFFFFF"],
];

const ColorSelection = ({
    isDark,
    selected,
    setSelected,
    options = COLOR_MATRIX_OPTIONS,
    shouldAutoFetch = true,
    onPaletteSelected, // optional callback (Finish button etc.)
}) => {
    const [paletteOptions, setPaletteOptions] = useState(options);
    const [fetching, setFetching] = useState(false);
    const [selecting, setSelecting] = useState(false);
    const [fetchError, setFetchError] = useState("");

    /* ---------------- NORMALIZE ---------------- */
    const normalizePalette = (palette) => {
        if (Array.isArray(palette)) return palette;
        if (Array.isArray(palette?.colors)) return palette.colors;
        if (Array.isArray(palette?.palette)) return palette.palette;
        return null;
    };

    /* ---------------- FETCH PALETTES ---------------- */
    const fetchPalettes = useCallback(async () => {
        if (!shouldAutoFetch) return;

        const sessionId = Cookies.get("session_id");
        if (!sessionId) {
            setFetchError("Session expired. Restart flow.");
            return;
        }

        setFetching(true);
        setFetchError("");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/recommendation/color-palettes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("access_token")}`,
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                }
            );

            const data = await res.json();

            if (!res.ok || !Array.isArray(data?.palettes)) {
                throw new Error(data?.message || "Palette fetch failed");
            }

            const normalized = data.palettes
                .map(normalizePalette)
                .filter(Boolean);

            setPaletteOptions(normalized.length ? normalized : options);
            setSelected?.(null);
        } catch (err) {
            setFetchError(err.message);
        } finally {
            setFetching(false);
        }
    }, [shouldAutoFetch, setSelected, options]);

    useEffect(() => {
        fetchPalettes();
    }, [fetchPalettes]);

    /* ---------------- SELECT PALETTE API ---------------- */
    const handleSelectPalette = (index) => {
        setSelected(index);
    };



    /* ---------------- STATES ---------------- */
    if (fetching) {
        return (
            <div className="w-full text-center py-16 opacity-70">
                Fetching palettes...
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 text-sm mb-4">{fetchError}</p>
                <button
                    onClick={fetchPalettes}
                    className="px-6 py-2 rounded-full border hover:bg-black hover:text-white"
                >
                    Retry
                </button>
            </div>
        );
    }

    /* ---------------- MATRIX UI ---------------- */
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {paletteOptions.map((palette, i) => (
                <div
                    key={i}
                    onClick={() => handleSelectPalette(i)}
                    className={`
                        rounded-2xl p-3 cursor-pointer transition border relative
                        ${selected === i
                            ? isDark
                                ? "border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                : "border-black shadow-md"
                            : isDark
                                ? "border-white/10 hover:bg-white/5"
                                : "border-gray-300 hover:bg-gray-50"
                        }
                    `}
                >
                    {selecting && selected === i && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl">
                            <span className="text-xs text-white">Saving…</span>
                        </div>
                    )}

                    <div className="flex w-full h-24 rounded-lg overflow-hidden">
                        {palette.map((color, idx) => (
                            <div
                                key={idx}
                                className="flex-1 h-full"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorSelection;
