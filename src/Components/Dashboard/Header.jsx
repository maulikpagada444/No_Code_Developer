import React from "react";
import { NavLink } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Header = () => {
    return (
        <header className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-semibold">
                    ✏️ Logo
                </div>

                {/* Navigation */}
                <nav className="flex gap-6 text-sm font-medium">
                    <NavLink to="/dashboard" className={({ isActive }) =>
                        isActive ? "text-black" : "text-gray-400 hover:text-black"
                    }>
                        Dashboard
                    </NavLink>

                    <NavLink to="/dashboard/project" className={({ isActive }) =>
                        isActive ? "text-black" : "text-gray-400 hover:text-black"
                    }>
                        Project
                    </NavLink>

                    <NavLink to="/dashboard/setting" className={({ isActive }) =>
                        isActive ? "text-black" : "text-gray-400 hover:text-black"
                    }>
                        Setting
                    </NavLink>
                </nav>

                {/* User */}
                <div className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm">
                    Demo User
                    <FiUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
