import React from "react";
import { FiLock } from "react-icons/fi";

const SettingSecurity = () => {
    return (
        <div className="border rounded-2xl bg-white p-10">

            <h2 className="text-lg font-semibold mb-1">
                Account Security
            </h2>

            <p className="text-sm text-gray-500 mb-10">
                Update your profile information and public details
            </p>

            <div className="space-y-6">

                {/* Current Password */}
                <div>
                    <label className="block text-sm mb-2">
                        Current Password
                    </label>
                    <div className="flex items-center border rounded-lg px-4 py-3">
                        <FiLock className="text-gray-400 mr-3" />
                        <input
                            type="password"
                            placeholder="Enter Your Current Password"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm mb-2">
                        New Password
                    </label>
                    <div className="flex items-center border rounded-lg px-4 py-3">
                        <FiLock className="text-gray-400 mr-3" />
                        <input
                            type="password"
                            placeholder="Enter Your New Password"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm mb-2">
                        Confirm New Password
                    </label>
                    <div className="flex items-center border rounded-lg px-4 py-3">
                        <FiLock className="text-gray-400 mr-3" />
                        <input
                            type="password"
                            placeholder="Enter Your Confirm New Password"
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

export default SettingSecurity;
