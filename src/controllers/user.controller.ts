import { Request, Response } from "express";
import User, { Iuser} from '../models/user';
import jwt from "jsonwebtoken";
import config from '../config/config'

function createTokem(user: Iuser) {
    return jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 86400
    });
}
export const signUp = async (req: Request, res: Response): Promise<Response> => {
    const {email, password, name} = req.body;
    if (!email || !password || !name) {
        return res.status(200).json({msg: 'Please. Send your email and password'})
    }
    const user = await User.findOne({email: email});
    if (user) {
        return res.status(200).json({msg: 'Email existente'})
    }
    const newUser = new User({email, password, name});
    await newUser.save();
    return res.status(200).json({token: createTokem(newUser), user: { id: newUser._id, name: newUser.name}})
}

export const sigIn = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({msg: 'Please. Send your email and password'})
    }

    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(200).json({msg: 'Usuario inexistente'});
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        return res.status(200).json({token: createTokem(user), user: { id: user._id, name: user.name}})
    } else {
        return res.status(200).json({msg: 'Usuario y/o contraseña incorrectos'})
    }
}