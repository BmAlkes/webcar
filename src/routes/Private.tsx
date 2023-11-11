import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: React.ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/login" />;
  }
  return children;
}
