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

