import React, { useState } from "react";
import Header from "./Header";
import SettingProfile from "./SettingProfile";
import SettingSecurity from "./SettingSecurity";

const Setting = () => {
    const [tab, setTab] = useState("profile");

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold mb-6">Setting</h1>

                {/* Tabs */}
                <div className="inline-flex border rounded-full p-1 mb-8">
                    <button
                        onClick={() => setTab("profile")}
                        className={`px-6 py-2 rounded-full text-sm ${tab === "profile"
                                ? "bg-gray-200 text-black"
                                : "text-gray-500"
                            }`}
                    >
                        Profile
                    </button>

                    <button
                        onClick={() => setTab("security")}
                        className={`px-6 py-2 rounded-full text-sm ${tab === "security"
                                ? "bg-gray-200 text-black"
                                : "text-gray-500"
                            }`}
                    >
                        Security
                    </button>
                </div>

                {/* Content */}
                {tab === "profile" && <SettingProfile />}
                {tab === "security" && <SettingSecurity />}
            </div>
        </div>
    );
};

export default Setting;
