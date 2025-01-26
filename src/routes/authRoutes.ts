import express from 'express';
import { register, login } from '../controllers/authController';
import { addBalance, transferBalance } from '../services/authService';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Rota para adicionar saldo
router.post('/user/:id/deposit', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body; // amount é o valor que o usuário deseja adicionar ao saldo

    try {
        const updatedUser = await addBalance(id, amount);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para transferir saldo
router.post('/user/transfer', async (req, res) => {
    const { fromUserId, toAccountNumber, amount } = req.body; // Dados da transferência

    try {
        const result = await transferBalance(fromUserId, toAccountNumber, amount);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;