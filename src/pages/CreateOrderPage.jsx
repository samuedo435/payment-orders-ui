import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { createOrder } from "../services/orderService";

/**
 * Creación de órdenes de pago.
 */
function CreateOrderPage() {

    const navigate = useNavigate();

    const [description, setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const order =
                await createOrder({

                    description,

                    amount:
                        Number(amount)

                });

            navigate(
                `/orders/${order.id}`
            );

        } catch (err) {

            setError(
                "Error creating order"
            );

            console.error(err);
        }
    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>
                    Create Order
                </h2>

                <hr />

                {
                    error &&
                    (
                        <div
                            className="alert alert-danger"
                        >
                            {error}
                        </div>
                    )
                }

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="mb-3">

                        <label
                            className="form-label"
                        >
                            Description
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label
                            className="form-label"
                        >
                            Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) =>
                                setAmount(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary"
                    >
                        Create Order
                    </button>

                </form>

            </div>
        </>
    );
}

export default CreateOrderPage;