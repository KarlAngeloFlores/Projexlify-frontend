import { Loader2 } from "lucide-react"

const LoadingScreen = ({message = 'Loading'}) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
            <div className='flex justify-center items-center animate-spin text-blue-500'><Loader2 size={32}/></div>
            <p className="text-gray-400">{message}</p>
        </div>
    </div>
  )
}

export default LoadingScreen