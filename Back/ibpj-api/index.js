import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

import authRoutes from './src/routes/authRoutes.js';
import eventoRoutes from './src/routes/eventoRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import postagemRoutes from './src/routes/postagemRoutes.js';


import path from 'path';
import { fileURLToPath } from 'url';

// 1. Inicializar o Prisma
const prisma = new PrismaClient();

// 2. Configuração do Servidor Express
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware (Configurações Globais)
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

// Middleware para servir arquivos estáticos (Imagens/Uploads)
// Isso torna acessível: http://localhost:4000/uploads/nome-do-arquivo.jpg
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Rota de Teste Simples
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'IBPJ API está online!',
        database: 'Conectado ao PostgreSQL via Prisma' 
    });
});

// 2. Conectando as rotas da aplicação
app.use('/auth', authRoutes);
app.use('/eventos', eventoRoutes);
app.use('/users', userRoutes);
app.use('/postagens', postagemRoutes);

// 3. Inicializar o Servidor e a Conexão com o DB
async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Conexão com o PostgreSQL via Prisma estabelecida com sucesso!');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error('❌ Falha ao iniciar a API ou conectar ao banco de dados:', e);
        process.exit(1);
    }
}

main();