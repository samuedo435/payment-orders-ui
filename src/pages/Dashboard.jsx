import { useAuth } from "../context/AuthContext";

/**
 * Dashboard principal.
 */
function DashboardPage() {

    const {
        email,
        role
    } = useAuth();

    return (

        <div className="container mt-4">

            <h2>
                Dashboard
            </h2>

            <hr />

            <p>
                <strong>User:</strong>
                {" "}
                {email}
            </p>

            <p>
                <strong>Role:</strong>
                {" "}
                {role}
            </p>

        </div>
    );
}

export default DashboardPage;