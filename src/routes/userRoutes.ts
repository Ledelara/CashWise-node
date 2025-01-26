import express from 'express';
import { IUser } from '../types/@Types';
import { deleteUser, updateUser } from '../services/authService';

const router = express.Router();

// Rota para editar dados do usuário
router.put("/user/:id", async (req, res) => {
    const { id } = req.params;
    const userData: IUser = req.body;

    try {
        const updatedUser = await updateUser(id, userData);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

// Rota para excluir usuário
router.delete("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});

export default router; 