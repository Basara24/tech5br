import { Request, Response } from "express";
import EventsModel from "../models/EventsModel";
import { authenticateToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

// Upload de imagem para evento
export const uploadEventImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Nenhuma imagem enviada." });
        }

        const imageUrl = `/uploads/${req.file.filename}`; // Caminho da imagem salva

        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer upload da imagem." });
    }
};

// Lista todos os eventos
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await EventsModel.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar eventos." });
    }
};

// Busca evento por ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await EventsModel.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar evento." });
    }
};

// Criação de evento (Apenas organizadores podem criar)
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { name, date, location, description, image_url } = req.body;
        const organizer_id = (req as any).user.id;
        
        if (!name || !date || !location || !description) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        }
        
        const event = await EventsModel.create({ name, date, location, description, image_url, organizer_id });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar evento." });
    }
};

// Atualização de evento (Apenas organizador pode editar)
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const event = await EventsModel.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }
        
        if (event.organizer_id !== (req as any).user.id) {
            return res.status(403).json({ error: "Permissão negada." });
        }
        
        await event.update(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar evento." });
    }
};

// Deleta evento (Apenas organizador pode deletar)
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const event = await EventsModel.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Evento não encontrado." });
        }
        
        if (event.organizer_id !== (req as any).user.id) {
            return res.status(403).json({ error: "Permissão negada." });
        }
        
        await event.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar evento." });
    }
};
