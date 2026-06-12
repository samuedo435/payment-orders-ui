import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Restringe acceso según rol.
 */
function RoleGuard({
    allowedRoles,
    children
}) {

    const { role } = useAuth();

    if (!allowedRoles.includes(role)) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
}

export default RoleGuard;