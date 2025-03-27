import { Request, Response } from 'express';
import UserModel from '../models/UserModel';


//acha todos os usuarios
export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll();
    res.send(users);
}


//acha um usuario pelo id
export const getById = async (
    req: Request <{id: number}>,
    res: Response) => {

        const user = await UserModel.findByPk(req.params.id);

        return res.json(user);
    }

export const createUsers = async (req: Request, res: Response) => {
     const { name } = req.body;

        const user = await UserModel.create({ name });
        res.status(201).json(user);
}

