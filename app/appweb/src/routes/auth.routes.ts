import { Router } from "express";
import {  getByUsername, getAllUsers, getTime, login, updateTime, createUser, } from "../controllers/auth.controller";

const router = Router();

// Ruta para login
router.post('/login-user', login);

// Ruta para obtener tiempo restante del token
router.get('/getTime/:userId', getTime);

// Ruta para actualizar el tiempo del token
router.put('/updateTime', updateTime);

router.get('/users',getAllUsers);

router.get('/users/:username',getByUsername);

router.post('/users', createUser);

export default router;