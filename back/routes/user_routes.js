// import Router from 'express'
// const router = new Router()
// import UserController from '../controllers/user_controllers.js'

// router.post('/user', UserController.createUser)
// router.get('/user', UserController.getUsers)
// router.get('/user/:id', UserController.getOneUser)
// router.put('/user', UserController.updateUser)
// router.delete('/user/:id', UserController.createUser)

// module.exports = router

import express from 'express'
const Router = express.Router;

const router = Router();
import UserController from '../controllers/user_controllers.js'

router.post('/user', UserController.createUser);
router.get('/user', UserController.getUsers);
router.get('/user/:id', UserController.getOneUser);
router.put('/user', UserController.updateUser);
router.delete('/user/:id', UserController.createUser);

export default router