import Express from "express";
import {getAll,
     getById,
    createUsers,
    updateUser} from "../controllers/usercontroller";

const router = Express.Router();

router.get('/users', getAll);
router.get('/users/:id', getById);
router.post('/users', createUsers);
router.put('/users/:id', updateUser);

export default router;