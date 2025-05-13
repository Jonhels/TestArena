import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/common/Loader/Loader";

const ProtectedRoute = ({ children, redirectTo = "/", requiredRole }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader message="Logger inn, vennligst vent..." />;
  }

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
