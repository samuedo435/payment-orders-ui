import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protege rutas que requieren autenticación.
 */
function ProtectedRoute({ children }) {

    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;