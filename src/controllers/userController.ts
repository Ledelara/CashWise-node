import { Request, Response } from "express";
import { addBalance, transferBalance, updateUser, withdraw } from '../services/authService';

export const depositAmount = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body; // amount é o valor que o usuário deseja adicionar ao saldo

    try {
        const updatedUser = await addBalance(id, amount);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const transferAmount = async (req: Request, res: Response) => {
    const { fromUserId, toAccountNumber, amount } = req.body; // Dados da transferência

    try {
        const result = await transferBalance(fromUserId, toAccountNumber, amount);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const withdrawAmount = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount } = req.body; // Recebendo o valor do saque

    try {
        const updatedUser = await withdraw(id, amount);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

// Handler para transação
export const handleTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'Transação realizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar transação' });
    }
}

// Handler para extrato do usuário
export const getStatement = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        res.status(200).json({ message: `Extrato do usuário ${userId}` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter extrato' });
    }
};
