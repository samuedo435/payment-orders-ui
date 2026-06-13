import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../services/orderService";

/**
 * Dashboard principal.
 */
function DashboardPage() {

    const {
        email,
        role
    } = useAuth();

    const [orders, setOrders] =
        useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const data =
                await getAllOrders();

            setOrders(data);

        } catch (error) {

            console.error(
                "Error loading dashboard data",
                error
            );
        }
    };

    const totalOrders =
        orders.length;

    const pendingOrders =
        orders.filter(
            order =>
                order.status === "PENDING"
        ).length;

    const approvedOrders =
        orders.filter(
            order =>
                order.status === "APPROVED"
        ).length;

    const rejectedOrders =
        orders.filter(
            order =>
                order.status === "REJECTED"
        ).length;

    return (
    <>
        <Navbar />

        <div className="container mt-4">

            <h2>
                Welcome
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

            <div className="row mt-4">

                <div className="col-md-3">

                    <div className="card">

                        <div className="card-body">

                            <h5>
                                Total Orders
                            </h5>

                            <h3>
                                {totalOrders}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card">

                        <div className="card-body">

                            <h5>
                                Pending
                            </h5>

                            <h3>
                                {pendingOrders}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card">

                        <div className="card-body">

                            <h5>
                                Approved
                            </h5>

                            <h3>
                                {approvedOrders}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card">

                        <div className="card-body">

                            <h5>
                                Rejected
                            </h5>

                            <h3>
                                {rejectedOrders}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-4">

                <Link
                    to="/orders"
                    className="btn btn-primary me-2"
                >
                    View Orders
                </Link>

                {
                    role === "OPERATOR" &&
                    (
                        <Link
                            to="/orders/create"
                            className="btn btn-success"
                        >
                            Create Order
                        </Link>
                    )
                }

            </div>

        </div>

    </>
);
}

export default DashboardPage;