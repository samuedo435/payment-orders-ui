import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

/**
 * Proveedor global de autenticación.
 */
export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    const [email, setEmail] = useState(
    localStorage.getItem("email")
);

    const login = (jwtToken, userRole, userEmail) => {

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("role", userRole);
    localStorage.setItem("email", userEmail);

    setToken(jwtToken);
    setRole(userRole);
    setEmail(userEmail);
};

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        setToken(null);
        setRole(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                email,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook para acceder al contexto.
 */
export function useAuth() {
    return useContext(AuthContext);
}