import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const RequireAuth = ({ children }: { children: any }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
