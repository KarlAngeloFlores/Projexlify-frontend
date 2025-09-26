import { useState } from "react";
import { Loader2, CheckCircle2, CircleX } from "lucide-react";
import "../styles/animations.css";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";

const ChangePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    error: "",
    success: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      error: "",
      success: "",
    }));
  };

  const handleForgotPassword = async () => {
    await authService.logout();
    navigate("/forgot_password");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setForm((prev) => ({ ...prev, loading: true, error: "", success: "" }));

      const result = await authService.changePassword(
        form.oldPassword,
        form.newPassword
      );
      console.log(result);

      setForm((prev) => ({
        ...prev,
        success: "Password changed successfully!",
        oldPassword: "",
        newPassword: "",
      }));

      await authService.logout();

      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    } catch (error) {
      console.log(error);
      setForm((prev) => ({
        ...prev,
        error: error.message || "Something went wrong. Please try again.",
      }));
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const getButtonContent = () => {
    if (form.loading) {
      return (
        <div className="animate-spin cursor-not-allowed">
          <Loader2 className="text-white dark:text-black" size={24} />
        </div>
      );
    }
    return "Change Password";
  };

  return (
    <>
    <div className="w-full min-h-screen bg-gray-100" />
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">

      <div className="w-full max-w-md modal-animation">
        <div className="bg-white dark:bg-gray-800/70 backdrop-blur-md rounded-2xl border border-gray-300 dark:border-gray-700 p-8 shadow-2xl relative">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              Change Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Update your account password
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                required
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your old password"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                value={form.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your new password"
              />
            </div>

            {/* Error & Success */}
            {form.error && (
              <div className="text-red-600 dark:text-red-400 text-sm mb-2 flex items-center">
                <CircleX size={18} className="mr-1" /> {form.error}
              </div>
            )}
            {form.success && (
              <div className="flex items-center text-green-600 dark:text-green-500 text-sm mb-2">
                <CheckCircle2 size={18} className="mr-1" /> {form.success}
              </div>
            )}

            <button
              type="submit"
              disabled={form.loading}
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02]"
            >
              {getButtonContent()}
            </button>
          </form>

          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Forgot your password?{" "}
              <a
                onClick={handleForgotPassword}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
              >
                Click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChangePage;
