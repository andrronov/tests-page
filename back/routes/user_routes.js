import express from 'express'
import UserController from '../controllers/user_controllers.js'

const Router = express.Router;

const router = Router();

router.post('/user', UserController.handleUserInfo)

export default router