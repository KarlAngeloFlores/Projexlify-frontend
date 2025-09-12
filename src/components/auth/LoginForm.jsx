import React, { useState } from 'react'
import authService from '../../services/auth'
import { CheckCircle2, Loader2, CircleX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({setCurrentAuth}) => {

  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: '',
    password: '',
  }); 

  //status for this component only
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const result = await authService.login(creds.email, creds.password);
      setSuccessMessage(result);
      setIsSuccess(true);
      navigate('/home')
      // setTimeout(() => , 3000);
    
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

    const getButtonContent = () => {
      if (loading) {
        return <div className="animate-spin cursor-not-allowed"><Loader2 color="white" size={24} /></div>
      }
      return 'Login';
    };

    const handleCredsChange = (e) => {
      const { name, value } = e.target;
      
      setCreds(prev => ({
        ...prev,
        [name]: value
      }));
      
      setError('');
      setSuccessMessage('');
    }


  return (
    <section className='h-screen'>
        <div className='max-w-7xl mx-auto w-full h-full flex items-center justify-center px-4'>
          <div className="w-full max-w-md">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8 shadow-2xl">
              {/* Logo */}

              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Projexlify
                </span>
              </div>

              {/* Welcome Text */}
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                <p className="text-gray-400">Sign in to your account to continue</p>
              </div>

              {/* Login Form */}
              <form className="space-y-2" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={creds.email}
                    onChange={handleCredsChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={creds.password}
                    onChange={handleCredsChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                </div>
                {/* Error & Success Messages */}
                {error && <div className="text-red-400 text-sm mb-2 flex items-center"><CircleX size={18} className='mr-1' /> {error}</div>}
                {successMessage && (
                  <div className="flex items-center text-green-500 text-sm mb-2">
                    <CheckCircle2 size={18} className="mr-1" /> {successMessage}
                  </div>
                )}

                <div className="flex items-center justify-between">
                <div></div>
                  <div className="text-sm">
                    <a href="forgot_password" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  disabled={loading || isSuccess}
                  type="submit"
                  className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02]"
                >
                  {getButtonContent()}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a onClick={() => setCurrentAuth('register')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                    Sign up here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default LoginForm