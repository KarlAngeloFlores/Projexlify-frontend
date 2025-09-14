import React, { useState } from "react";
import { ChevronDown, Lock, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";

const Logout = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    //Clear cookies -> proceed to login
    await authService.logout();
    navigate("/auth");
  };

  const handleChangePassword = () => {
    navigate("/change_password")
  }


  return (
    <div className="relative">
      {/* Profile section */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 w-10 h-10 rounded-full flex items-center justify-center">
          {user?.username ? user.username[0].toUpperCase() : "U"}
        </div>
        <span>{user ? user.username : "User"}</span>
        <ChevronDown className={`${open ? 'rotate-180' : ''} w-4 h-4 transition-all`} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2  bg-gray-900 text-white rounded-lg shadow-lg p-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <button
            onClick={handleChangePassword}
            className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 rounded-lg transition-colors text-nowrap"
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
