import Express from "express";
import {getAll,
     getById,
    createUsers} from "../controllers/usercontroller";

const router = Express.Router();

router.get('/users', getAll);
router.get('/users/:id', getById);
router.post('/users', createUsers);

export default router;