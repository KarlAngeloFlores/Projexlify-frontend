import React, { useState } from "react";
import { ChevronDown, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import ThemeToggle from "../styles/ThemeToggle";

const Logout = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/auth");
  };

  const handleChangePassword = () => {
    navigate("/change_password");
  };

  return (
    <div className="relative">
      {/* Profile section */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setOpen(!open)}
        >
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </div>
          <span className="text-gray-900 dark:text-white sm:block hidden">
            {user ? user.username : "User"}
          </span>
          <ChevronDown
            className={`${open ? "rotate-180" : ""} w-4 h-4 transition-all text-gray-600 dark:text-gray-300`}
          />
        </div>
        <ThemeToggle />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <button
            onClick={handleChangePassword}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-nowrap"
          >
            <Lock className="w-4 h-4" />
            Change password
          </button>
        </div>
      )}
    </div>
  );
};

export default Logout;
