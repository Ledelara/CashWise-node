import dotenv from 'dotenv'
import cors from 'cors' 
import { PrismaClient } from '@prisma/client'
import express from 'express'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import withdrawRoutes from './routes/withdrawRoutes'

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/user', withdrawRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

