import { api, AuthStorage } from '../api/core.js';

export const Postagem = {
    // 1. Postagem.list() (GET /postagens)
    list: async () => {
        const response = await api.get('/postagens');
        return response.data;
    },

    // 2. Postagem.create() (POST /postagens)
    create: async (data) => {
        // Envia todos os dados, incluindo a imagem_url obtida do UploadFile
        const response = await api.post('/postagens', data);
        return response.data;
    },
    
    // 3. Postagem.update() (PUT /postagens/:id)
    update: async (id, data) => {
        const response = await api.put(`/postagens/${id}`, data);
        return response.data;
    },
    
    // 4. Postagem.delete() (DELETE /postagens/:id)
    delete: async (id) => {
        await api.delete(`/postagens/${id}`);
        return true;
    },
};