import { useState } from "react";
import authService from "../../services/auth";
import { CircleX, Loader2 } from "lucide-react";
import "../../styles/animations.css";

const RegisterForm = ({ setCurrentAuth, setEmail, setPassword, setToken }) => {
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleCredsChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    if (name === "username") {
      // allow only letters, numbers, and underscore
      sanitizedValue = value.replace(/[^a-zA-Z0-9_]/g, "");
    }

    setCreds((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authService.register(creds.username, creds.email);

      setEmail(creds.email);
      setPassword(creds.password);
      setToken(result.token);
      setIsSuccess(true);
      setCurrentAuth("verification");
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <div className="animate-spin cursor-not-allowed">
          <Loader2 color="white" size={24} />
        </div>
      );
    }
    return "Register";
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

            {/* Welcome Text */}
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Create your account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up to get started with Projexlify
              </p>
            </div>

            {/* Register Form */}
            <form className="space-y-2" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={creds.username}
                  maxLength={100}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // prevent space key
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (paste.includes(" ")) e.preventDefault();
                  }}
                  onChange={handleCredsChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  maxLength={100}
                  value={creds.email}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // prevent space key
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (paste.includes(" ")) e.preventDefault();
                  }}
                  onChange={handleCredsChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={creds.password}
                  onKeyDown={(e) => {
                    if (e.key === " ") e.preventDefault(); // prevent space key
                  }}
                  onPaste={(e) => {
                    const paste = e.clipboardData.getData("text");
                    if (paste.includes(" ")) e.preventDefault();
                  }}
                  onChange={handleCredsChange}
                  maxLength={100}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                  <div className="flex items-center text-sm text-red-700 dark:text-red-400">
                    <CircleX size={18} className="mr-2 flex-shrink-0" /> {error}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || isSuccess}
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                {getButtonContent()}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  onClick={() => setCurrentAuth("login")}
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

export default RegisterForm;
