import { PrismaClient } from "@prisma/client";
import { IUser } from "../types/userTypes";

const prisma = new PrismaClient();

export const updateUser = async (id: string, userData: IUser) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: userData,
        });
        return updatedUser;
    } catch (error) {
        throw new Error('Erro ao atualizar o usuário');
    }
};

export const deleteUser = async (id: string) => {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });
        return deletedUser;
    } catch (error) {
        throw new Error('Erro ao excluir o usuário');
    }
};