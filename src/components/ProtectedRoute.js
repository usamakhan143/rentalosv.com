import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  requireAuth = true,
}) => {
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();

  // If authentication is required but user is not logged in
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific role is required
  if (requiredRole && userProfile && userProfile.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is admin, allow access to all routes
  if (userProfile && userProfile.role === "admin") {
    return children;
  }

  return children;
};

export default ProtectedRoute;
