import {
    Link,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/**
 * Menú principal.
 */
function Navbar() {

    const navigate = useNavigate();

    const {
        role,
        logout
    } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
        >

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    Payment Orders
                </Link>

                <div
                    className="navbar-nav"
                >

                    <Link
                        className="nav-link"
                        to="/dashboard"
                    >
                        Dashboard
                    </Link>

                    <Link
                        className="nav-link"
                        to="/orders"
                    >
                        Orders
                    </Link>

                    {
                        role === "OPERATOR" && (

                            <Link
                                className="nav-link"
                                to="/orders/create"
                            >
                                Create Order
                            </Link>
                        )
                    }

                    {
                        role === "ADMIN" &&
                        (
                            <Link
                                to="/admin"
                                className="nav-link"
                            >
                                Administration
                            </Link>
                        )
                    }

                </div>

                <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;