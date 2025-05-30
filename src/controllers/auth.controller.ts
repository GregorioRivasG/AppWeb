import { Request, Response } from "express";
import { generateAccessToken } from '../utils/generateToken';
import { cache } from '../utils/cache';
import dayjs from "dayjs";
import { User } from "../models/User";

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ 
            message: "Username y password son requeridos" 
        });
    }

    try {
        const user = await User.findOne({ username });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ 
                message: "Credenciales incorrectas" 
            });
        }

        const userId = user._id.toString();
        const accessToken = generateAccessToken(userId);
        
        cache.set(userId, accessToken, 60 * 15);

        return res.json({
            message: 'Login exitoso',
            accessToken,
            userId
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: "Error en el servidor" 
        });
    }
};
export const getTime = (req: Request, res: Response) => {
    const { userId } = req.params;
    
    if (!userId) {
        return res.status(400).json({ 
            message: "userId es requerido" 
        });
    }

    const ttl = cache.getTtl(userId);
    
    if (!ttl) {
        return res.status(404).json({ 
            message: "Token no encontrado o expirado" 
        });
    }

    const now = Date.now();
    const timeToLifeSeconds = Math.floor((ttl - now) / 1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTime,
        message: "El token expira en ${timeToLifeSeconds} segundos"
    });
};

export const updateTime = (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ 
            message: "userId es requerido" 
        });
    }

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({ 
            message: 'Token no encontrado o expirado' 
        });
    }

    const nuevaTTLsegundos = 60 * 15;
    cache.ttl(userId, nuevaTTLsegundos);

    return res.json({ 
        message: "Actualizado con éxito",
        newTTL: nuevaTTLsegundos 
    });
};

export const getAllUsers=async (req: Request, res: Response) =>{
 const userList= await User.find();

 return res.json({ userList });
}

export const getByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

export const createUser= async (req: Request, res: Response) => {
    try{
        const {username, password,email,role} = req.body;

        const newUser = new User({
            username,
            password,
            role,
            email,
            status: true
        });

        const user=await newUser.save();
        return res.json({ user })

    }catch(error){
        console.log("Error ocurrido en createUser: ", error);
        return res.status(426).json({ error })
    }
}