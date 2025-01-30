import { PrismaClient } from "@prisma/client";
import { getUserStatement } from "./transactionsService";

const prisma = new PrismaClient();

export const getUserData = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const statement = await getUserStatement(userId);

    return {
        name: user.name,
        accountNumber: user.accountNumber,
        balance: user.balance,
        statement,
    };
};
