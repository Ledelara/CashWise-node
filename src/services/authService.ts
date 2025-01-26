import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { IUser } from "../types/userTypes";

const prisma = new PrismaClient();

export const registerUser = async (userData: IUser) => {
    const { name, email, password, transactionPassword } = userData;

    // Verificando se o e-mail jjá existe
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        },
    });

    if (existingUser) {
        throw new Error("E-mail já cadastrado");
    }

    // Criptografando as senhas
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedTransactionPassword = await bcrypt.hash(transactionPassword, 10);

    // Gerando número de conta aleatório
    const accountNumber = Math.floor(100000 + Math.random() * 900000).toString();

    // Criando usuário
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            transactionPassword: hashedTransactionPassword,
            accountNumber,
        }
    });

    return newUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    };

    // Verificando a senha
    const isPassowrdValid = await bcrypt.compare(password, user.password);
    if (!isPassowrdValid) {
        throw new Error("Senha inválida");
    };

    // Gerando token JWT
    const token = jwt.sign(
        { userId: user.id, accountNumber: user.accountNumber },
        process.env.JWT_SECRET as string,
        { expiresIn: "2h" }
    );

    return { token, userId: user.id, name: user.name, email: user.email };
}; 

export const updateUser = async (userId: string, userData: IUser) => {
    const { name, email, password, transactionPassword } = userData;

    // Verificando se o usuário existe
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    };

    // Criptografando as senhas se elas forem fornecidas
    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;
    const hashedTransactionPassword = transactionPassword ? await bcrypt.hash(transactionPassword, 10) : user.transactionPassword;

    // Atualizando usuário
    const updateUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name: name || user.name,
            email: email || user.email,
            password: hashedPassword,
            transactionPassword: hashedTransactionPassword
        }
    });

    return updateUser;
}

export const deleteUser = async (userId: string) => {
    // Verificando se o usuário existe
    const user = await prisma.user.findUnique({
        where: { id: userId }   
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    };

    const deletedUser = await prisma.user.delete({
        where: { id: userId }
    });

    return deletedUser;
};

// Função para adicionar saldo
export const addBalance = async (userId: string, amount: number) => {
    if (amount <= 0) {
        throw new Error("O valor deve ser positivo.");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    // Atualizando o saldo do usuário
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            balance: user.balance + amount,
        },
    });

    return updatedUser;
};

// Função para transferir saldo
export const transferBalance = async (fromUserId: string, toAccountNumber: string, amount: number) => {
    if (amount <= 0) {
        throw new Error("O valor da transferência deve ser positivo.");
    }

    const fromUser = await prisma.user.findUnique({
        where: { id: fromUserId },
    });

    if (!fromUser) {
        throw new Error("Usuário de origem não encontrado.");
    }

    if (fromUser.balance < amount) {
        throw new Error("Saldo insuficiente.");
    }

    const toUser = await prisma.user.findUnique({
        where: { accountNumber: toAccountNumber },
    });

    if (!toUser) {
        throw new Error("Usuário de destino não encontrado.");
    }

    // Realizando a transferência
    const updatedFromUser = await prisma.user.update({
        where: { id: fromUserId },
        data: {
            balance: fromUser.balance - amount,
        },
    });

    const updatedToUser = await prisma.user.update({
        where: { accountNumber: toAccountNumber },
        data: {
            balance: toUser.balance + amount,
        },
    });

    return { updatedFromUser, updatedToUser };
};

// Função para sacar saldo
export const withdraw = async (id: string, amount: number) => {
    // Verificar se o valor do saque é válido
    if (amount <= 0) {
        throw new Error("O valor do saque deve ser maior que zero.");
    }

    // Buscar o usuário no banco de dados
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    // Verificar se o saldo é suficiente para o saque
    if (user.balance < amount) {
        throw new Error("Saldo insuficiente.");
    }

    // Subtrair o valor do saldo
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            balance: user.balance - amount,
        },
    });

    return updatedUser;
};