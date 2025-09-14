import React, { useState } from 'react'
import { Loader2, CircleX } from 'lucide-react'
const EmailForm = ({handleEmail}) => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const onSubmit = async (e) => {
        e.preventDefault();

      try {
        setLoading(true);
        await handleEmail(email);
        setError('');
        
      } catch (error) {
        setError(error.message || 'Something went wrong. Please try again later.')
      } finally {
        setLoading(false);
      }
    }

    const handleEmailChange = (e) => {
        setError('');
        setEmail(e.target.value);
    };

    const getButtonContent = () => {
      if(loading) return <div className='animate-spin'><Loader2 color='white' size={24}/></div>
      return 'Send code'
    }

  return (
    <section className="h-screen">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-md modal-animation">
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
              <h2 className="text-2xl font-bold text-white mb-1">Forgot password</h2>
              <p className="text-gray-400">Input your email for verification code</p>
            </div>

            {/* Register Form */}
            <form className="space-y-2" onSubmit={onSubmit}>
            
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
                {error && <div className="text-red-500 text-sm mb-2"><CircleX size={18} className='mr-1'/>{error}</div>}
              </div>  

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02]"
              >
                {getButtonContent()}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <a href='auth' className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailForm