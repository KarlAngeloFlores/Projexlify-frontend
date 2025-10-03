const Button = ({ 
  children, 
  buttonType, // style
  type = "button",       // HTML type
  onClick, 
  disabled 
}) => {
  const buttonStyle = () => {
    switch (buttonType) {
      case "normal":
        return "px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center cursor-pointer";
      case "update":
        return "px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center cursor-pointer";
      case "delete":
        return "px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center cursor-pointer";
      default:
        return "px-6 py-3 text-gray-300 border border-gray-600 rounded-lg font-medium hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
    }
  };

  return (
    <button
      type={type}  
      onClick={onClick}
      disabled={disabled}
      className={buttonStyle()}
    >
      {children}
    </button>
  );
};

export default Button;
