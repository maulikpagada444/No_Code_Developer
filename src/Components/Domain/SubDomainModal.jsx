import React, { useState } from "react";
import DNSWaitModal from "./DNSWaitModal";

const SubDomainModal = ({ onClose, onNext }) => {
    const [subdomain, setSubdomain] = useState("");
    const [showDNSWait, setShowDNSWait] = useState(false);

    return (
        <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl">
                <div
                    className="
                    w-[90%] max-w-md rounded-3xl p-8
                    bg-gradient-to-b from-[#0f0f0f] to-[#050505]
                    border border-white/10 shadow-2xl text-white
                "
                >
                    {/* TITLE */}
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Get a Custom Domain
                    </h2>

                    {/* DOMAIN INPUT */}
                    <div className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                Domain
                            </label>
                            <input
                                value={subdomain}
                                onChange={(e) => setSubdomain(e.target.value)}
                                placeholder="Enter Your Domain"
                                className="
                                w-full px-4 py-3 rounded-lg
                                bg-white/5 border border-white/10
                                text-white placeholder-gray-500
                                outline-none focus:border-white/30
                            "
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                Name Server
                            </label>
                            <input
                                placeholder="Enter Your Name Server"
                                className="
                                w-full px-4 py-3 rounded-lg
                                bg-white/5 border border-white/10
                                text-white placeholder-gray-500
                                outline-none
                            "
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                                Name Server
                            </label>
                            <input
                                placeholder="Enter Your Name Server"
                                className="
                                w-full px-4 py-3 rounded-lg
                                bg-white/5 border border-white/10
                                text-white placeholder-gray-500
                                outline-none
                            "
                            />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-400 hover:text-white transition"
                        >
                            Previews
                        </button>

                        <button
                            onClick={() => setShowDNSWait(true)}
                            className="
        px-6 py-2.5 rounded-full text-sm font-medium
        bg-white/10 border border-white/20
        hover:bg-white/20 transition
    "
                        >
                            DNS Config
                        </button>

                    </div>
                </div>
            </div>
            {showDNSWait && (
                <DNSWaitModal onClose={() => setShowDNSWait(false)} />
            )}
        </>
    );
};

export default SubDomainModal;
