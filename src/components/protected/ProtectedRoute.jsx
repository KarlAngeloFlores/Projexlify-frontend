import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../../services/auth";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.verify();
        setUserRole(data.role);
        setIsAuthenticated(true);
      } catch (error) {
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) 
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 size={32} className="text-white" />
      </div>
    );

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
