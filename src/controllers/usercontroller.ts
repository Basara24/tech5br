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

    try{
        
     const { name } = req.body;

     if (!name || name === '') {
            return res.status(400).json({ error: 'Name is required' });
     }

        const user = await UserModel.create({ name });
        res.status(201).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

export const updateUser = async (
     req: Request<{ id: string }>,
     res: Response) => {

    try{
        
     const { name } = req.body;

     if (!name || name === '') {
            return res.status(400).json({ error: 'Name is required' });
     }
     const user = await UserModel.findByPk(req.params.id);

        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name;

        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

// deleta um usuario pelo id
export const destroyById = async (
    req: Request <{id: string }>,
    res: Response) => {

        try{
        const user = await UserModel.findByPk(req.params.id);

        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        return res.json(user);

        res.status(204).send()
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}