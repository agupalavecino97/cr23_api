import { Request, Response } from "express";
import Lineup, { Ilineup } from '../models/lineUp';
import config from '../config/config'

export const getLineUp = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(200).json({error: 'Datos faltantes.'})
    }
    const lineUp = await Lineup.find({userId: userId});
    if (lineUp) {
        return res.status(200).json({data: lineUp});
    } else {
        return res.status(200).json({error: 'Error al obtener datos.'});
    }
}

export const addToLineUp = async (req: Request, res: Response): Promise<Response> => {
    const { bandasToAdd, bandasToRemove, id } = req.body;
    if ((!bandasToAdd && !bandasToRemove) || !id) {
        return res.status(200).json({error: 'Datos faltantes.'})
    }
    bandasToAdd.forEach(async (banda: number) => {
        const lineUp = new Lineup({userId: id, bandaId: banda});
        await lineUp.save();            
    });
    bandasToRemove.forEach(async (banda: number) => {       
        await Lineup.deleteOne ({"userId": id, "bandaId": banda});
    });
    return res.status(200).json({msg: 'lineUp actualizado.'});
}

export const deleteToLineUp = async (req: Request, res: Response): Promise<Response> => {
    const { userId, bandId } = req.body;
    if (!userId || !bandId) {
        return res.status(400).json({msg: 'Please. Send data complete.'})
    }
    await Lineup.deleteOne({userId: userId, bandId: bandId});
    return res.status(200).json({msg: 'lineUp actualizado.'});
}