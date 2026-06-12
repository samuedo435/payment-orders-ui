import axiosClient from "../api/axiosClient";

/**
 * Crea una orden.
 */
export async function createOrder(
    order
) {

    const response =
        await axiosClient.post(
            "/orders",
            order
        );

    return response.data;
}

/**
 * Obtiene todas las órdenes.
 */
export async function getAllOrders() {

    const response =
        await axiosClient.get("/orders");

    return response.data;
}

/**
 * Obtiene una orden por ID.
 */
export async function getOrderById(id) {

    const response =
        await axiosClient.get(
            `/orders/${id}`
        );

    return response.data;
}

/**
 * Aprueba una orden.
 */
export async function approveOrder(id) {

    const response =
        await axiosClient.put(
            `/orders/${id}/approve`
        );

    return response.data;
}

/**
 * Rechaza una orden.
 */
export async function rejectOrder(id) {

    const response =
        await axiosClient.put(
            `/orders/${id}/reject`
        );

    return response.data;
}

/**
 * Sube una factura.
 */
export async function uploadInvoice(
    id,
    file
) {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const response =
        await axiosClient.post(
            `/orders/${id}/invoice`,
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        );

    return response.data;
}