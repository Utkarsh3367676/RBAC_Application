import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRoute({ children, requiredPermissions }) {
  const { currentUser, hasPermission } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermissions) {
    const [resource, action] = requiredPermissions;
    if (!hasPermission(resource, action)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}

export default PrivateRoute;
