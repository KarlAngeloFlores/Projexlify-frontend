import { Loader2, CircleX, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import authService from "../../services/auth";
import "../../styles/animations.css";

const VerificationForm = ({ type, handleVerification, email }) => {
  const purpose = {
    verify_account: {
      title: "Verify your account",
      button_text: "Verify",
      purpose: "account_verification",
    },
    change_password: {
      title: "Change password code",
      button_text: "Confirm",
      purpose: "password_reset",
    },
  };

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResendVerification = async () => {
    try {
      await authService.resendVerificationCode(
        email,
        purpose[type].purpose
      );
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again later."
      );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleVerification(code);
      setIsSuccess(true);

      if (type === "verify_account") {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

const handleCodeChange = (e) => {
  setError("");
  const numericValue = e.target.value.replace(/\D/g, ""); 
  setCode(numericValue);
};

  const getButtonContent = () => {
    if (loading)
      return (
        <div className="animate-spin cursor-not-allowed">
          <Loader2 color="white" size={24} />
        </div>
      );
    return purpose[type].button_text;
  };

  return (
    <section className="h-screen bg-gray-100 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md modal-animation">
          <div className="bg-white/90 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
            {/* Logo */}
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Projexlify
              </span>
            </div>

{/* Title & Description */}
<div className="text-center mb-4">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
    {purpose[type].title}
  </h2>
  <p className="text-gray-600 dark:text-gray-400">
    Enter the verification code sent to your email
  </p>
  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
    Didn’t see it? Check your <span className="font-medium">Spam</span> or <span className="font-medium">Junk</span> folder.
  </p>
</div>

            {/* Form */}
            <form className="space-y-3" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Verification Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  value={code}
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={handleCodeChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your code"
                />

                {/* Success Message */}
                {type === "verify_account" && isSuccess && (
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm mt-2">
                    <CheckCircle2 size={18} className="mr-1" /> Successful
                    registration. Redirecting to login...
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="flex items-center text-red-600 dark:text-red-400 text-sm mt-2">
                    <CircleX size={18} className="mr-1" /> {error}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || isSuccess}
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                {getButtonContent()}
              </button>
            </form>

            {/* Resend Code */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Didn’t receive a code?{" "}
                <a
                  disabled={isSuccess}
                  onClick={() => handleResendVerification()}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
                >
                  Resend
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationForm;
