import { Loader2, CheckCircle2, CircleX } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/animations.css";

const ForgotForm = ({ handleForgotPassword }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    newPassword: "",
    repeatPassword: "",
    error: "",
    success: "",
    loading: false,
  });

  const handlePassChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
      error: "",
      success: "", // clear success message when typing again
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
        setPassword((prev) => ({
        ...prev,
        loading: true,
        error: "",
        success: "",
      }));
    try {
      await handleForgotPassword(password.newPassword, password.repeatPassword);
      setPassword((prev) => ({
        ...prev,
        success: "Password changed successfully! Redirecting...",
        newPassword: "",
        repeatPassword: "",
      }));

      //redirect to auth
      setTimeout(() => navigate("/auth"), 2000);
    } catch (error) {
      setPassword((prev) => ({
        ...prev,
        error: error.message || "Something went wrong. Please try again later.",
      }));
    } finally {
      setPassword((prev) => ({ ...prev, loading: false }));
    }
  };

  const getButtonContent = () => {
    if (password.loading) {
      return (
        <div className="animate-spin cursor-not-allowed">
          <Loader2 color="white" size={24} />
        </div>
      );
    }
    return "Change password";
  };

  return (
    <section className="h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md modal-animation">
          <div className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Projexlify
              </span>
            </div>

            {/* Title */}
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Forgot password
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Input your new password
              </p>
            </div>

            {/* New Password Form */}
            <form className="space-y-2" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  New password
                </label>
                <input
                  type="password"
                  id="newpassword"
                  name="newPassword"
                  required
                  maxLength={100}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // prevent space key
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");

                    if (paste.includes(" ")) e.preventDefault();
                  }}
                  onChange={handlePassChange}
                  value={password.newPassword}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your new password"
                />
              </div>

              <div>
                <label
                  htmlFor="repeat-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeatpassword"
                  name="repeatPassword"
                  value={password.repeatPassword}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // prevent space key
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (paste.includes(" ")) e.preventDefault();
                  }}
                  onChange={handlePassChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Repeat your password"
                />
              </div>

              {/* Error & Success Messages */}
              {password.error && (
                <div className="flex items-center text-red-600 dark:text-red-400 text-sm mt-2">
                  <CircleX size={18} className="mr-1" />
                  {password.error}
                </div>
              )}
              {password.success && (
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm mt-2">
                  <CheckCircle2 size={18} className="mr-1" /> {password.success}
                </div>
              )}

              <button
                type="submit"
                disabled={password.loading}
                className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {getButtonContent()}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/auth")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotForm;
