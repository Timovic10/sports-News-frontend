import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthReady } = useAuthStore();

  if (!isAuthReady) {
    return (
      <div className="text-center mt-20 text-black dark:text-white">
        Checking auth...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
