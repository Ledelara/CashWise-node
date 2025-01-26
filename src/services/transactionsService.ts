import { PrismaClient } from '@prisma/client';
import { ITransaction } from '../types/@Types';

const prisma = new PrismaClient();

// Função para registrar uma transação
export const createTransaction = async (transactionData: ITransaction) => {
    return await prisma.transaction.create({
        data: {
            userId: transactionData.userId,
            type: transactionData.type,
            amount: transactionData.amount,
            toAccount: transactionData.toAccount || null,
        },
    });
};

// Função para obter o extrato do usuário
export const getUserStatement = async (userId: string): Promise<ITransaction[]> => {
    const transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
    });

    return transactions.map((transaction) => ({
        userId: transaction.userId,
        type: transaction.type as 'deposit' | 'withdraw' | 'transfer',
        amount: transaction.amount,
        toAccount: transaction.toAccount || undefined,
    }));
};

