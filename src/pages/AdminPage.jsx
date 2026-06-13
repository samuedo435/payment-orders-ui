import {
    useState
} from "react";

import Navbar from "../components/Navbar";

import {
    archiveOrders
}
from "../services/orderService";

function AdminPage() {

    const [cutoffDate,
        setCutoffDate] =
        useState("");

    const [result,
        setResult] =
        useState(null);

    const handleArchive =
        async () => {

            try {

                const response =
                    await archiveOrders(
                        cutoffDate
                    );

                setResult(response);

            } catch (error) {

                console.error(error);
            }
        };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2>
                    Administration
                </h2>

                <hr />

                <h5>
                    Archive Rejected Orders
                </h5>

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    value={cutoffDate}
                    onChange={(e) =>
                        setCutoffDate(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-warning"
                    onClick={
                        handleArchive
                    }
                >
                    Archive Orders
                </button>

                {
                    result &&
                    (
                        <div className="alert alert-success mt-3">

                            <strong>
                                {result.processStatus}
                            </strong>

                            <br />

                            Archived records:
                            {" "}
                            {result.archivedRecords}

                        </div>
                    )
                }

            </div>
        </>
    );
}

export default AdminPage;