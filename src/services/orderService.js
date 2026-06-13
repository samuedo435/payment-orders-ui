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

/**
 * Descarga la factura de una orden.
 */
export async function downloadInvoice(id) {

    const response =
        await axiosClient.get(
            `/orders/${id}/invoice`,
            {
                responseType: "blob"
            }
        );

    return response.data;
}

/**
 * Obtiene el historial de cambios de una orden.
 */
export async function getOrderHistory(id) {

    const response =
        await axiosClient.get(
            `/orders/${id}/history`
        );

    return response.data;
}

/**
 * Archiva las órdenes que tienen una fecha anterior a la especificada.
 */
export async function archiveOrders(
    cutoffDate
) {

    const response =
        await axiosClient.post(
            "/orders/archive-orders",
            {
                cutoffDate
            }
        );

    return response.data;
}