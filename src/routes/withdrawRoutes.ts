import express from 'express';
import { withdraw } from '../services/authService';  // Importando o método de saque

const router = express.Router();

// Rota para saque
router.put('/withdraw/:id', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;  // Recebendo o valor do saque

    try {
        const updatedUser = await withdraw(id, amount);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router;