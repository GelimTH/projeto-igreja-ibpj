import { api, AuthStorage } from '../api/core.js';

export const Evento = {
    // 1. Evento.list() (GET /eventos)
    // O frontend pode passar um parâmetro de ordenação (ex: "-data")
    list: async (orderBy = '-data') => {
        const response = await api.get('/eventos', {
            params: { orderBy }
        });
        return response.data;
    },

    // 2. Evento.create() (POST /eventos)
    create: async (data) => {
        const response = await api.post('/eventos', data);
        return response.data;
    },
    
    // 3. Evento.update() (PUT /eventos/:id)
    update: async (id, data) => {
        const response = await api.put(`/eventos/${id}`, data);
        return response.data;
    },
    
    // 4. Evento.delete() (DELETE /eventos/:id)
    delete: async (id) => {
        await api.delete(`/eventos/${id}`);
        return true;
    },
};