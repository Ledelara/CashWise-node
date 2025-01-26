import { Request, Response } from 'express';

// Handler para transação
export const handleTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        // Exemplo de lógica para processar a transação
        res.status(200).json({ message: 'Transação realizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar transação' });
    }
};

// Handler para extrato do usuário
export const getStatement = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        res.status(200).json({ message: `Extrato do usuário ${userId}` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter extrato' });
    }
};