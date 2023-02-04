import { Request, Response } from "express";
import Lineup, { Ilineup } from '../models/lineUp';
import config from '../config/config'

export const getLineUp = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({msg: 'Please. Send a userId.'})
    }
    const lineUp = await Lineup.find({userId: userId});
    if (lineUp) {
        return res.status(200).json({data: lineUp});
    } else {
        return res.status(400).json({msg: 'Error al obtener datos.'});
    }
}

export const addToLineUp = async (req: Request, res: Response): Promise<Response> => {
    const { bandas, id } = req.body;
    if (!bandas || !id) {
        return res.status(400).json({msg: 'Please. Send data complete.'})
    }
    bandas.forEach(async (banda: string) => {
        console.log({userId: id, bandaId: banda})
        const lineUp = new Lineup({userId:id, bandaId:banda});
        await lineUp.save();            
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