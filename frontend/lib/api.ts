import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
}

interface ApiError {
    status: number;
    message: string;
    error?: string;
}

class ApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string = API_BASE_URL) {
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Interceptor для добавления токена в заголовки
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Interceptor для обработки ошибок
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    // Token expired, clear auth
                    localStorage.removeItem('authToken');
                    window.location.href = '/sign-in';
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get<T>(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.put<T>(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.client.delete<T>(url);
        return response.data;
    }

    async patch<T>(url: string, data?: any): Promise<T> {
        const response = await this.client.patch<T>(url, data);
        return response.data;
    }
}

export const api = new ApiClient();

// API methods
export const projectsApi = {
    getAll: () => api.get('/projects'),
    getById: (id: string) => api.get(`/projects/${id}`),
    create: (data: any) => api.post('/projects', data),
    update: (id: string, data: any) => api.put(`/projects/${id}`, data),
    delete: (id: string) => api.delete(`/projects/${id}`),
};

export const contactsApi = {
    submit: (data: { name: string; email: string; message: string }) =>
        api.post('/contacts', data),
    getAll: () => api.get('/contacts'),
};

export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (email: string, password: string, firstName?: string) =>
        api.post('/auth/register', { email, password, firstName }),
    logout: () => api.post('/auth/logout'),
};
