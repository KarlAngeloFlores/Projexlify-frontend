import { Check, ArrowRight, Menu, X, Zap, Clock, Target,  } from 'lucide-react'
import NavHeader from '../components/NavHeader'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const navigate = useNavigate('/auth');

  const features = [
    {
      icon: <Check className="w-6 h-6 text-white" />,
      title: "Task Management",
      description: "Experience blazing fast performance across all devices."
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "History Tracking",
      description: "Built-in History tracking and scheduling tools to keep your projects on time and on budget."
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Goal Management",
      description: "Set, track, and achieve your project goals with intelligent milestone tracking."
    }
  ]

  return (
    <div className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Navigation */}  
      <NavHeader />

      {/* Hero Section */}
      <section className="py-40 px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Project Management
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your productivity with Projexlify. An intuitive project management platform 
            that grows with your workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/auth')} className="group bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-600 dark:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-700 transition-all transform hover:scale-105 flex items-center shadow-lg">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                manage projects
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From planning to execution, Projexlify provides all the tools your team needs to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-white/80 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:transform hover:scale-105 shadow-md dark:shadow-none"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-gray-300 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Projexlify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage