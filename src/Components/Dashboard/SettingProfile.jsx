import React from "react";
import { FiUser, FiMail, FiUpload } from "react-icons/fi";

const SettingProfile = () => {
    return (
        <div className="border rounded-2xl bg-white p-10">

            <h2 className="text-lg font-semibold mb-1">
                Profile Information
            </h2>

            <p className="text-sm text-gray-500 mb-10">
                Update your profile information and public details
            </p>

            <div className="space-y-6">

                {/* Avatar */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full border border-gray-300 bg-gray-50" />
                    <button className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-100 transition">
                        <FiUpload />
                        Change Photo
                    </button>
                </div>

                {/* Username */}
                <div>
                    <label className="block text-sm mb-2">
                        Username
                    </label>
                    <div className="flex items-center border rounded-lg px-4 py-3">
                        <FiUser className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Enter Your Username"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm mb-2">
                        Email
                    </label>
                    <div className="flex items-center border rounded-lg px-4 py-3">
                        <FiMail className="text-gray-400 mr-3" />
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6">
                    <button className="border px-6 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-gray-100 transition">
                        Save Changes ↗
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingProfile;
