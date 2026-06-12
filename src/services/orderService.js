import axiosClient from "../api/axiosClient";

/**
 * Obtiene todas las órdenes.
 */
export async function getAllOrders() {

    const response = await axiosClient.get(
        "/orders"
    );

    return response.data;
}