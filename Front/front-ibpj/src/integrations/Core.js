import { api } from '../api/core.js';
import axios from 'axios';

// Simula a função UploadFile que o PostagemForm.jsx estava chamando
// Rota da API: POST http://localhost:4000/postagens/upload
export const UploadFile = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file); 
    
    try {
        const token = localStorage.getItem('ibpj_token');
        
        const response = await axios.post('http://localhost:4000/postagens/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data; 
    } catch (error) {
        console.error("Erro no upload do arquivo:", error);
        throw new Error("Falha ao enviar arquivo para o servidor.");
    }
};