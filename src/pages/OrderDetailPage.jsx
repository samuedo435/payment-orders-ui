import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth }
from "../context/AuthContext";

import {
    getOrderById,
    approveOrder,
    rejectOrder,
    uploadInvoice
}
from "../services/orderService";

/**
 * Detalle de orden.
 */
function OrderDetailPage() {

    const { id } =
        useParams();

    const { role } =
        useAuth();

    const [order, setOrder] =
        useState(null);

    const [selectedFile,
        setSelectedFile] =
        useState(null);

    useEffect(() => {

        loadOrder();

    }, [id]);

    const loadOrder =
        async () => {

            const data =
                await getOrderById(id);

            setOrder(data);
        };

    const handleApprove =
        async () => {

            await approveOrder(id);

            loadOrder();
        };

    const handleReject =
        async () => {

            await rejectOrder(id);

            loadOrder();
        };

    const handleUpload =
        async () => {

            if (!selectedFile) {
                return;
            }

            await uploadInvoice(
                id,
                selectedFile
            );

            loadOrder();
        };

    if (!order) {

        return (
            <>
                <Navbar />
                <div className="container mt-4">
                    Loading...
                </div>
            </>
        );
    }

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>
                    Order Detail
                </h2>

                <hr />

                <p>
                    <strong>ID:</strong>
                    {" "}
                    {order.id}
                </p>

                <p>
                    <strong>Description:</strong>
                    {" "}
                    {order.description}
                </p>

                <p>
                    <strong>Amount:</strong>
                    {" "}
                    ${order.amount}
                </p>

                <p>
                    <strong>Status:</strong>
                    {" "}
                    {order.status}
                </p>

                <p>
                    <strong>Created By:</strong>
                    {" "}
                    {order.createdBy}
                </p>

                <p>
                    <strong>Invoice:</strong>
                    {" "}
                    {
                        order.invoicePath
                            ? "Uploaded"
                            : "Not uploaded"
                    }
                </p>

                {
                    role === "ADMIN"
                    &&
                    order.status === "PENDING"
                    &&
                    (
                        <div
                            className="mb-3"
                        >

                            <button
                                className="btn btn-success me-2"
                                onClick={
                                    handleApprove
                                }
                            >
                                Approve
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={
                                    handleReject
                                }
                            >
                                Reject
                            </button>

                        </div>
                    )
                }

                {
                    role === "OPERATOR"
                    &&
                    (
                        <div>

                            <input
                                type="file"
                                className="form-control mb-2"
                                onChange={(e) =>
                                    setSelectedFile(
                                        e.target.files[0]
                                    )
                                }
                            />

                            <button
                                className="btn btn-primary"
                                onClick={
                                    handleUpload
                                }
                            >
                                Upload Invoice
                            </button>

                        </div>
                    )
                }

            </div>

        </>
    );
}

export default OrderDetailPage;