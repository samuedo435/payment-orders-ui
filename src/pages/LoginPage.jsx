import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

/**
 * Pantalla de autenticación.
 */
function LoginPage() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await loginService({
                    email,
                    password
                });

            login(
                response.token,
                response.role,
                response.email
            );

            navigate("/dashboard");

        } catch {

            setError(
                "Invalid credentials"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h3 className="mb-4 text-center">
                                Login
                            </h3>

                            {
                                error &&
                                <div
                                    className="alert alert-danger"
                                >
                                    {error}
                                </div>
                            }

                            <form
                                onSubmit={handleSubmit}
                            >

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;