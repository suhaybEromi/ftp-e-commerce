import { useContext } from "react";
import { authContext } from "../../../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, loading } = useContext(authContext);

  if (loading) return <></>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
