import axios from 'axios';

// URL BASE DA SUA API (servidor Node.js)
const API_BASE_URL = 'http://localhost:4000';

// 1. Instância do Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor para Injeção do Token JWT
// Ele anexa o token do localStorage a TODAS as requisições, exceto login/register.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ibpj_token'); // Armazenamos o token aqui
        
        // Se houver um token, adiciona no Header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Funções Utilitárias para Auth (Armazenamento do Token)
export const AuthStorage = {
    setToken: (token) => {
        localStorage.setItem('ibpj_token', token);
    },
    getToken: () => {
        return localStorage.getItem('ibpj_token');
    },
    clear: () => {
        localStorage.removeItem('ibpj_token');
    }
}