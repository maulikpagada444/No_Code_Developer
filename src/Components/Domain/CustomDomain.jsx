import React, { useContext, useMemo, useState } from "react";
import Header from "../Recommendation/Header.jsx";
import { ThemeContext } from "../../ThemeProvider.jsx";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import SubDomainModal from "../Domain/SubDomainModal";
const CustomDomain = () => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const [showSubDomainModal, setShowSubDomainModal] = useState(false);

    const steps = useMemo(() => {
        return [
            {
                title: "Buy a Domain",
                content: (
                    <>
                        <ol className={`mt-4 list-decimal pl-5 space-y-1 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                            <li>
                                Click <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Buy Domain</span> on our website
                            </li>
                            <li>
                                You will be redirected to <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Hostinger</span>
                            </li>
                            <li>
                                Search for your domain name
                                <div className={isDark ? "text-gray-500" : "text-gray-600"}>Example: mybrand.com</div>
                            </li>
                            <li>
                                Complete the payment on <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Hostinger</span>
                            </li>
                        </ol>
                        <div className={`mt-3 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            <span className={isDark ? "text-yellow-400" : "text-yellow-600"}>👉</span>{" "}
                            <span className={isDark ? "text-gray-200" : "text-gray-800"}>Note:</span>{" "}
                            Domain payment is made directly to hostinger
                        </div>
                    </>
                ),
            },
            {
                title: "Come Back To Our Website",
                content: (
                    <>
                        <div className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                            After buying the domain:
                        </div>
                        <ol className={`mt-3 list-decimal pl-5 space-y-1 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                            <li>Visit editor to website</li>
                            <li>Enter the domain name you purchased</li>
                            <li>
                                Click <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>ConnectDomain</span>
                            </li>
                        </ol>
                    </>
                ),
            },
            {
                title: "Update Nameservers in Hostinger",
                content: (
                    <>
                        <div className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                            To connect your domain purchased from hostinger to our website follow these steps:
                        </div>
                        <ol className={`mt-3 list-decimal pl-5 space-y-1 text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}>
                            <li>
                                Login to your <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Hostinger</span> account
                            </li>
                            <li>Go to Domains</li>
                            <li>Click on your domain name</li>
                            <li>
                                Open <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>DNS/Nameservers</span>
                            </li>
                            <li>
                                Select <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Use Custom Name servers</span>
                            </li>
                            <li>
                                Copy &amp; Paste the nameservers you will see like this:
                                <div className={`mt-2 space-y-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                                    <div>ns1.dns-parking.com</div>
                                    <div>ns2.dns-parking.com</div>
                                </div>
                            </li>
                            <li>
                                Click <span className={isDark ? "text-white font-semibold" : "text-black font-semibold"}>Save</span>
                            </li>
                        </ol>
                    </>
                ),
            },
        ];
    }, []);

    return (
        <>
            <div
                className={`min-h-screen relative overflow-hidden ${isDark ? "bg-[#0a0a0a] text-white" : "bg-[#fafafa] text-black"}`}
            >
                <div
                    className={`absolute inset-0 pointer-events-none ${isDark
                        ? "bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)]"
                        : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"} bg-size-[32px_32px]`}
                />

                {isDark && (
                    <div className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.95)_100%)]" />
                )}

                {isDark && (
                    <div className="absolute inset-x-0 top-0 h-56 pointer-events-none z-1 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0.06),transparent_65%)] blur-2xl" />
                )}

                <Header />

                <main
                    className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 h-[calc(100vh-72px)] overflow-y-auto"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    <style>{`
                    main::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>


                    <div className="mx-auto w-full max-w-6xl">

                        <div className="space-y-8">
                            {steps.map((step, idx) => (
                                <div
                                    key={step.title}
                                    className={`relative overflow-hidden rounded-lg border ${isDark ? "border-white/15 bg-black/30" : "border-black bg-white"}`}
                                    style={{
                                        boxShadow: isDark
                                            ? "0 0 0 1px rgba(255,255,255,0.06), 0 18px 52px rgba(0,0,0,0.55)"
                                            : "none",
                                        backdropFilter: isDark ? "blur(10px)" : undefined,
                                        WebkitBackdropFilter: isDark ? "blur(10px)" : undefined,
                                        backgroundImage: isDark
                                            ? "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))"
                                            : "linear-gradient(180deg, rgba(255,255,255,1), rgba(245,245,245,1))",
                                    }}
                                >
                                    {isDark && (
                                        <span
                                            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-25"
                                            style={{
                                                background: "radial-gradient(60% 100% at 50% 110%, rgba(255,255,255,0.25), rgba(255,255,255,0) 65%)",
                                            }}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <div className="px-5 sm:px-6 py-5">
                                        <div className="text-xl sm:text-2xl font-semibold">
                                            {`Step ${idx + 1}: ${step.title}`}
                                        </div>

                                        <div
                                            className={`mt-4 h-px w-full ${isDark ? "bg-white/20" : "bg-black"}`}
                                        />

                                        {step.content}
                                    </div>
                                </div>
                            ))}

                            <div
                                className={`relative overflow-hidden rounded-lg border ${isDark ? "border-white/15 bg-black/30" : "border-black bg-white"}`}
                                style={{
                                    boxShadow: isDark
                                        ? "0 0 0 1px rgba(255,255,255,0.06), 0 18px 52px rgba(0,0,0,0.55)"
                                        : "none",
                                    backdropFilter: isDark ? "blur(10px)" : undefined,
                                    WebkitBackdropFilter: isDark ? "blur(10px)" : undefined,
                                    backgroundImage: isDark
                                        ? "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))"
                                        : "linear-gradient(180deg, rgba(255,255,255,1), rgba(245,245,245,1))",
                                }}
                            >
                                {isDark && (
                                    <span
                                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-25"
                                        style={{
                                            background: "radial-gradient(60% 100% at 50% 110%, rgba(255,255,255,0.25), rgba(255,255,255,0) 65%)",
                                        }}
                                        aria-hidden="true"
                                    />
                                )}
                                <div className="px-5 sm:px-6 py-5">
                                    <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold">
                                        <BsExclamationTriangleFill size={30} className="text-yellow-400" />
                                        <span>Important Notes (For Users)</span>
                                    </div>

                                    <div className={`mt-4 h-px w-full ${isDark ? "bg-white/20" : "bg-black"}`} />

                                    <ul className={`mt-4 space-y-2 text-sm sm:text-base opacity-80 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                        <li className="list-disc list-inside">You must renew your domain every year</li>
                                        <li className="list-disc list-inside">If the domain expires, your website will stop working</li>
                                        <li className="list-disc list-inside">Do not change nameservers unless instructed</li>
                                        <li className="list-disc list-inside">SSL and DNS are handled automatically by us</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-4">
                                <a
                                    href="https://www.hostinger.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`relative h-10 px-5 rounded-md sm:rounded-lg text-sm font-medium transition-all inline-flex items-center border overflow-hidden ${isDark
                                        ? "text-white border-white/10 hover:brightness-110 active:brightness-95"
                                        : "text-black border-gray-400 hover:bg-white active:bg-zinc-50"}`}
                                    style={{
                                        backgroundColor: isDark ? "rgba(0,0,0,0.6)" : undefined,
                                        backgroundImage: isDark
                                            ? "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02))"
                                            : "linear-gradient(180deg, rgba(255,255,255,1), rgba(243,243,243,1))",
                                    }}
                                >
                                    <span className="relative z-10 inline-flex items-center">
                                        Hostinger
                                        <FiArrowUpRight size={14} className="ml-2 opacity-90" />
                                    </span>
                                    <span
                                        className="pointer-events-none absolute inset-0 rounded-md sm:rounded-lg"
                                        style={{
                                            background: isDark
                                                ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0))"
                                                : undefined,
                                        }}
                                        aria-hidden="true"
                                    />
                                </a>

                                <button
                                    type="button"
                                    onClick={() => setShowSubDomainModal(true)}
                                    className={`cursor-pointer relative h-10 min-w-[120px] sm:min-w-[140px] px-6 rounded-full text-sm font-medium transition-all border overflow-hidden ${isDark
                                        ? "text-white border-white/10 hover:brightness-110 active:brightness-95"
                                        : "text-black border-gray-400 hover:bg-white active:bg-zinc-50"}`}
                                    style={{
                                        backgroundColor: isDark ? "rgba(0,0,0,0.6)" : undefined,
                                        backgroundImage: isDark
                                            ? "radial-gradient(40% 60% at 50% 110%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))"
                                            : "linear-gradient(180deg, rgba(255,255,255,1), rgba(243,243,243,1))",
                                    }}
                                >
                                    <span className="relative z-10">Next</span>
                                    {isDark && (
                                        <span
                                            className="pointer-events-none absolute inset-0 rounded-full opacity-20"
                                            style={{
                                                backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1.5px)",
                                                backgroundSize: "8px 8px",
                                            }}
                                            aria-hidden="true"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {showSubDomainModal && (
                <SubDomainModal
                    onClose={() => setShowSubDomainModal(false)}
                    onNext={() => {
                        setShowSubDomainModal(false);
                        // agar next page ya success modal chahiye to yaha add karo
                    }}
                />
            )}
        </>
    );
};

export default CustomDomain;