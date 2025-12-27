import React from "react";

const DNSWaitModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-xl">
            <div
                className="
                    w-[90%] max-w-md rounded-2xl px-8 py-10
                    bg-gradient-to-b from-[#0f0f0f] to-[#050505]
                    border border-white/10 shadow-2xl text-center
                "
            >
                <p className="text-lg font-medium text-gray-300 leading-relaxed">
                    Wait For <span className="text-white font-semibold">2–5 Minutes</span>
                    <br />
                    After Than Redirect You To Your Site
                </p>

                <button
                    onClick={onClose}
                    className="
                        mt-8 px-6 py-2.5 rounded-full text-sm font-medium
                        bg-white/10 border border-white/20
                        hover:bg-white/20 transition text-white
                    "
                >
                    Okay
                </button>
            </div>
        </div>
    );
};

export default DNSWaitModal;
