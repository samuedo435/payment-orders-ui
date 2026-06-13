import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllOrders, getArchivedOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Lista de órdenes.
 */
function OrdersPage() {

    const navigate = useNavigate();
    
    const { role } = useAuth();

    const [orders, setOrders] = useState([]);

    const [showArchived, setShowArchived] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    useEffect(() => {

        loadOrders();

    }, [showArchived]);

    const loadOrders = async () => {

        try {

            const data =
                showArchived
                    ? await getArchivedOrders()
                    : await getAllOrders();

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
                    {
                        showArchived
                            ? "Archived Orders"
                            : "Payment Orders"
                    }
                </h2>

                <hr />

                {
                    role === "ADMIN" &&
                    (
                        <div className="mb-3">
                        
                            <button
                                className={
                                    showArchived
                                        ? "btn btn-outline-primary me-2"
                                        : "btn btn-primary me-2"
                                }
                                onClick={() =>
                                    setShowArchived(false)
                                }
                            >
                                Active Orders
                            </button>
                            
                            <button
                                className={
                                    showArchived
                                        ? "btn btn-primary"
                                        : "btn btn-outline-primary"
                                }
                                onClick={() =>
                                    setShowArchived(true)
                                }
                            >
                                Archived Orders
                            </button>
                            
                        </div>
                    )
                }

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
                                        onClick={() =>
                                            navigate(
                                                `/orders/${order.id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>

                                    {
                                        showArchived &&
                                        (
                                            <span
                                                className="badge bg-secondary ms-2"
                                            >
                                                Archived
                                            </span>
                                        )
                                    }

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