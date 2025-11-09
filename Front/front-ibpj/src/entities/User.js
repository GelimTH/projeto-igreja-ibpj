import { api, AuthStorage } from '../api/core.js';

export const User = {
    // 1. User.me() (Usado no Layout.jsx para verificar o usuário logado)
    me: async () => {
        // Se não houver token, retorna nulo para simular o usuário deslogado
        if (!AuthStorage.getToken()) {
            return null;
        }

        try {
            // Chamamos GET /auth/me
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            // Se o token for inválido/expirado, limpamos o token local
            AuthStorage.clear();
            return null;
        }
    },

    // 2. Login (Necessário para o futuro formulário de login)
    login: async (email, password) => {
        // Chamamos POST /auth/login
        const response = await api.post('/auth/login', { email, password });

        // Armazenamos o token recebido
        AuthStorage.setToken(response.data.token);
        return response.data.user;
    },

    // 3. Logout (Usado no Layout.jsx)
    logout: async () => {
        AuthStorage.clear();
        // Não precisamos chamar o backend, apenas limpar o token local
        return true;
    },

    // 4. User.list() (Usado no Aniversarios.jsx)
    list: async () => {
        // Chamamos GET /users/aniversariantes
        const response = await api.get('/users/aniversariantes');
        return response.data;
    },
    
    register: async (userData) => {
        // userData = { email, password, full_name, data_nascimento }
        try {
            // Chama a rota POST /auth/register que criamos no backend
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            // Repassa o erro da API (ex: "Email já em uso")
            if (error.response && error.response.data) {
                throw new Error(error.response.data.error || 'Falha ao registrar.');
            }
            throw error;
        }
    },

    // Lista TODOS os usuários
    listAll: async () => {
        const response = await api.get('/users');
        return response.data;
    },
    // Atualiza a role
    updateRole: async (id, role) => {
        const response = await api.put(`/users/${id}/role`, { role });
        return response.data;
    },
    // Deleta um usuário
    deleteUser: async (id) => {
        await api.delete(`/users/${id}`);
        return true;
    },
};