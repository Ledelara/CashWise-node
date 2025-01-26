import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json({ message: "Usuário cadastrado com sucesso", newUser });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        res.status(200).json({ message: "Usuário logado com sucesso", result });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};