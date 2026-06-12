import axios from "axios";

/**
 * Cliente HTTP principal.
 */
const axiosClient = axios.create({

    baseURL: "http://localhost:8080/api",

    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * Interceptor JWT.
 */
axiosClient.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

/**
 * Manejo global de sesión expirada.
 */
axiosClient.interceptors.response.use(

    response => response,

    error => {

        if (error.response?.status === 401) {

            localStorage.clear();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;