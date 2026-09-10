import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const currUser = useSelector((state) => state.curr_user);

  if (!currUser) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && currUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;