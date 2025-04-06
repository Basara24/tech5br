import { Router } from "express";
import { 
    getAll, 
    getById, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser, 
    updateSubscription 
} from "../controllers/usercontroller";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Rotas de usuários
router.get("/users", authenticateToken, getAll); // Apenas usuários autenticados podem listar usuários
router.get("/users/:id", authenticateToken, getById);
router.post("/users", createUser); // Cadastro de usuário
router.post("/users/login", loginUser); // Login e obtenção de token
router.put("/users/:id", authenticateToken, updateUser);
router.delete("/users/:id", authenticateToken, deleteUser);

// Rota para atualização da assinatura (tornar usuário um organizador)
router.post("/users/:id/subscribe", authenticateToken, updateSubscription);

export default router;