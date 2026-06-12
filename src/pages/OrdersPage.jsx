import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

/**
 * Lista de órdenes.
 */
function OrdersPage() {

    const { role } = useAuth();

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

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
                "Error loading orders",
                error
            );
        }
    };

    const filteredOrders =
        orders.filter(order => {

            const matchesSearch =

                order.description
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =

                !statusFilter ||

                order.status ===
                statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>
                    Payment Orders
                </h2>

                <hr />

                <div className="row mb-3">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by description"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3">

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Statuses
                            </option>

                            <option value="PENDING">
                                Pending
                            </option>

                            <option value="APPROVED">
                                Approved
                            </option>

                            <option value="REJECTED">
                                Rejected
                            </option>

                        </select>

                    </div>

                </div>

                <table
                    className="table table-bordered table-hover"
                >

                    <thead>

                    <tr>

                        <th>ID</th>

                        <th>Description</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Created By</th>

                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        filteredOrders.map(order => (

                            <tr
                                key={order.id}
                            >

                                <td>
                                    {order.id}
                                </td>

                                <td>
                                    {order.description}
                                </td>

                                <td>
                                    ${order.amount}
                                </td>

                                <td>
                                    {order.status}
                                </td>

                                <td>
                                    {order.createdBy}
                                </td>

                                <td>

                                    <button
                                        className="btn btn-sm btn-primary me-2"
                                    >
                                        View
                                    </button>

                                    {
                                        role ===
                                        "ADMIN"

                                        &&

                                        order.status ===
                                        "PENDING"

                                        &&

                                        (
                                            <>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )
                                    }

                                </td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default OrdersPage;