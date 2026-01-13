import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
}
