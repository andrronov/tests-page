import express from 'express'
import { check } from "express-validator"
import authMiddleware from './authMiddleware.js'
import UserController from '../controllers/user_controllers.js'

const Router = express.Router;

const router = Router();

router.post('/user', [
   check('username', 'Обязательно заполните поля').notEmpty(),
   check('password', 'Пароль должен быть не меньше 4 символов').isLength({min: 4})
], UserController.createUser);
router.get('/user', authMiddleware, UserController.getUsers);
router.get('/user/:id', UserController.getOneUserByName);
router.post('/user/login', UserController.login);
router.put('/user', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router