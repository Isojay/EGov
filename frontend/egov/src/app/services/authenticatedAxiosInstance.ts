import axios from 'axios';

const authenticatedAxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
authenticatedAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Adjust based on how you store tokens
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
authenticatedAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default authenticatedAxiosInstance;

