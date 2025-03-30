import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto"; // Use uma variável de ambiente para segurança

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extrai o token do header

    if (!token) {
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
        (req as any).user = decoded; // Armazena os dados do usuário no request
        next(); // Passa para a próxima função da rota
    } catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado." });
    }
};
