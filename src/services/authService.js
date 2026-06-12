import axiosClient from "../api/axiosClient";

/**
 * Servicio de autenticación.
 */
export async function login(credentials) {

    const response = await axiosClient.post(
        "/auth/login",
        credentials
    );

    return response.data;
}