import express from 'express';
import { getStatement, handleTransaction } from '../controllers/transactionController';

const router = express.Router();

// Rota para registrar uma transação (depósito, saque ou transferência)
router.post('/transaction', handleTransaction);

// Rota para obter extrato do usuário pelo ID
router.get('/statement/:userId', getStatement);

export default router;
